export function getEmbedUrl(url: string) {
  if (!url) return;

  // YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.includes("v=")
      ? url.split("v=")[1]?.split("&")[0]
      : url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Loom
  if (url.includes("loom.com")) {
    // Endrer /share/id til /embed/id
    const videoId = url.split("/").pop();
    return `https://www.loom.com/embed/${videoId}`;
  }

  // Vimeo
  if (url.includes("vimeo.com")) {
    const videoId = url.split("/").pop();
    return `https://player.vimeo.com/video/${videoId}`;
  }

  return url;
}
