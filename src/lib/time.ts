// Copied from Anime Captcha
export function elapsedFrom(start: string | number) {
  if (typeof start === "string") start = Date.parse(start);

  // Calculate how far it is from BuildDate
  const now = Date.now();
  const diff = now - start;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const nnago =
    days > 0
      ? `${days} days ago`
      : hours > 0
      ? `${hours} hours ago`
      : minutes > 0
      ? `${minutes} minutes ago`
      : `${seconds} seconds ago`;
  return nnago;
}
