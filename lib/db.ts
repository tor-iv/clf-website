import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DB_PATH ?? './data/clf.db';
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS organizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    region TEXT,
    tagline TEXT,
    description TEXT NOT NULL,
    history TEXT,
    vision TEXT,
    team_members TEXT DEFAULT '[]',
    tags TEXT DEFAULT '[]',
    photo_url TEXT,
    gallery TEXT DEFAULT '[]',
    open_collective_url TEXT,
    featured INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    start_date TEXT,
    end_date TEXT,
    goal_amount INTEGER,
    org_id INTEGER REFERENCES organizations(id),
    status TEXT DEFAULT 'upcoming',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    organization TEXT,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

export const queries = {
  getAllOrgs: db.prepare('SELECT * FROM organizations ORDER BY featured DESC, name ASC'),
  getOrgBySlug: db.prepare('SELECT * FROM organizations WHERE slug = ?'),
  getFeaturedOrgs: db.prepare('SELECT * FROM organizations WHERE featured = 1 LIMIT 6'),
  getAllCampaigns: db.prepare("SELECT c.*, o.name as org_name FROM campaigns c LEFT JOIN organizations o ON c.org_id = o.id ORDER BY c.start_date DESC"),
  getCampaignBySlug: db.prepare("SELECT c.*, o.name as org_name FROM campaigns c LEFT JOIN organizations o ON c.org_id = o.id WHERE c.slug = ?"),
  createContact: db.prepare('INSERT INTO contact_submissions (name, email, organization, message) VALUES (?, ?, ?, ?)'),
};
