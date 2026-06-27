export function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(time) {
  if (!time) return "";

  return time.slice(0, 8);
}

export function getCountdown(date, time = "00:00:00") {
  if (!date) return "";

  const interview = new Date(date);

  const [hour, minute, second] = time.split(":").map(Number);

  interview.setHours(hour || 0);
  interview.setMinutes(minute || 0);
  interview.setSeconds(second || 0);
  interview.setMilliseconds(0);

  let diff = interview.getTime() - Date.now();

  if (diff <= 0) {
    return "Interview Passed";
  }

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
}