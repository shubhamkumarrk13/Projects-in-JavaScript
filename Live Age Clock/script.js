let timer;

function startAgeClock() {
  clearInterval(timer);

  const birthdate = document.getElementById("birthdate").value;

  if (!birthdate) {
    alert("Please select your birthdate!");
    return;
  }

  const birth = new Date(birthdate);

  timer = setInterval(() => {
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    let hours = now.getHours() - birth.getHours();
    let minutes = now.getMinutes() - birth.getMinutes();
    let seconds = now.getSeconds() - birth.getSeconds();

    if (seconds < 0) {
      seconds = seconds + 60;
      minutes--;
    }

    if (minutes < 0) {
      minutes = minutes + 60;
      hours--;
    }

    if (hours < 0) {
      hours = hours + 24;
      days--;
    }

    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days = days + prevMonth.getDate();
      months--;
    }

    if (months < 0) {
      months = months + 12;
      years--;
    }

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }, 1000);
}
