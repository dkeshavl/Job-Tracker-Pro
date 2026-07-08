export function formatDate(datetime) {
  if (!datetime) return "";
  const d = new Date(datetime);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(datetime) {
  if (!datetime) return "";
  const d = new Date(datetime);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function getCountdown(datetime) {
  if (!datetime) return "";

  const interview = new Date(datetime);
  const diff = interview.getTime() - Date.now();

  if (diff <= 0) return "Interview Passed";

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
}