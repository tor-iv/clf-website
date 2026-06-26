export function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
