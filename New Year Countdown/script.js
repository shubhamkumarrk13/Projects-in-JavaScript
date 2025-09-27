const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
  const currentYear = new Date().getFullYear();
  const newYearTime = new Date(`January 1 ${currentYear + 1} 00:00:00 `);
  const currentTime = new Date();

  const difference = newYearTime - currentTime;

  const d = Math.floor(difference / 1000 / 60 / 60 / 24);
  const h = Math.floor((difference / 1000 / 60 / 60) % 24);
  const m = Math.floor((difference / 1000 / 60) % 60);
  const s = Math.floor((difference / 1000) % 60);

  daysElement.innerHTML = d;
  hoursElement.innerHTML = h < 10 ? "0" + h : h;
  minutesElement.innerHTML = m < 10 ? "0" + m : m;
  secondsElement.textContent = s < 10 ? "0" + s : s;
}

setInterval(updateCountdown, 1000);
