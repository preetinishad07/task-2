let startTime = 0;
let interval;
let running = false;
let laps = [];
const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapList = document.getElementById("lapList");

startPauseBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    startTime = Date.now() - (startTime || 0);
    interval = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = "Pause";
  } else {
    running = false;
    clearInterval(interval);
    startPauseBtn.textContent = "Start";
  }
});

lapBtn.addEventListener("click", () => {
  if (!running) return;
  const elapsed = Date.now() - startTime;
  const ms = Math.floor((elapsed % 1000) / 10);
  const sec = Math.floor((elapsed / 1000) % 60);
  const min = Math.floor(elapsed / 60000);
  const time = `${pad(min)}:${pad(sec)}:${pad(ms)}`;
  laps.push(time);
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${laps.length}: ${time}`;
  lapList.appendChild(lapItem);
});

resetBtn.addEventListener("click", () => {
  running = false;
  clearInterval(interval);
  startTime = 0;
  laps = [];
  display.textContent = "00:00:00";
  startPauseBtn.textContent = "Start";
  lapList.innerHTML = "";
});

function updateDisplay() {
  const elapsed = Date.now() - startTime;
  const ms = Math.floor((elapsed % 1000) / 10);
  const sec = Math.floor((elapsed / 1000) % 60);
  const min = Math.floor(elapsed / 60000);
  display.textContent = `${pad(min)}:${pad(sec)}:${pad(ms)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}
