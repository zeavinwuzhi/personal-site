const liveClock = document.getElementById("live-clock");
const currentYear = document.getElementById("current-year");

function updateLiveClock() {
  if (!liveClock) {
    return;
  }

  const now = new Date();
  const datePart = new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    timeZone: "Asia/Shanghai",
  }).format(now);
  const timePart = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  }).format(now);
  liveClock.textContent = `${datePart} ${timePart}`;
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

updateLiveClock();
window.setInterval(updateLiveClock, 1000);
