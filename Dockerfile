# syntax=docker/dockerfile:1

# ──────────────────────────────────────────
# Stage 1: deps — install all dependencies
# (native build tools required for better-sqlite3)
# ──────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

# Native build deps for better-sqlite3
RUN apk add --no-cache python3 make g++ libc6-compat

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifests only (cache-friendly layer)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all deps; pnpm will rebuild native modules (better-sqlite3)
# for the current platform (linux/musl/arm64 or linux/musl/x64).
# --config.minimum-release-age=0 disables the "too new" safety check that
# fires in CI when packages in the lockfile were published within the last 24h.
RUN pnpm install --frozen-lockfile --config.minimum-release-age=0


# ──────────────────────────────────────────
# Stage 2: builder — compile the Next.js app
# ──────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Bring in node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy full source
COPY . .

ARG NEXT_PUBLIC_APP_URL=https://caregiverliberation.org
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

ENV NEXT_TELEMETRY_DISABLED=1

# SESSION_SECRET and ADMIN_PASSWORD are checked at module-init time; supply
# dummy values so `next build` can collect page data without throwing.
# The real secrets are injected at runtime via container env vars.
ENV SESSION_SECRET=build-time-placeholder-not-used-in-prod
ENV ADMIN_PASSWORD=placeholder

RUN pnpm build


# ──────────────────────────────────────────
# Stage 3: runner — minimal production image
# ──────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy standalone server output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static assets into the standalone tree where Next.js expects them
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# next-intl config and message files are not traced by standalone output;
# copy them explicitly so getTranslations() and the i18n plugin can find them.
COPY --from=builder --chown=nextjs:nodejs /app/i18n ./i18n
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages

# ── Native module fixup ────────────────────────────────────────────────────
# Next.js standalone tracing does NOT reliably follow the .pnpm virtual-store
# for better-sqlite3, so the .node binary built for this platform is missed.
# Explicitly copy the full module so the binding can be loaded at runtime.
COPY --from=builder --chown=nextjs:nodejs \
     /app/node_modules/.pnpm/better-sqlite3@12.11.1/node_modules/better-sqlite3 \
     ./node_modules/better-sqlite3

# ── Persistent data directory ──────────────────────────────────────────────
# Volume mount point; the app mkdirs DB_PATH and DATA_DIR at runtime,
# but pre-creating /app/data ensures the mount lands with correct ownership.
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

EXPOSE 3000

USER nextjs

ENV PORT=3000 HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
