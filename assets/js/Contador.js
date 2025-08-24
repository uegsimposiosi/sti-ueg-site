document.addEventListener("DOMContentLoaded", () => {
  const contador = document.getElementById("contador");

  const targetDate = new Date("2025-09-16T19:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      contador.innerHTML = "O simpósio já começou!";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    contador.innerHTML =
    `
        Faltam
        <span class="font-bold">${days}</span>d 
        <span class="font-bold">${hours}</span>h 
        <span class="font-bold">${minutes}</span>m 
        <span class="font-bold">${seconds}</span>s
    `;
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
});
