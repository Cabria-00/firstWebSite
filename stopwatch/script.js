// variable buttons
const startStopBtn = document.querySelector(".startBtn");
const resetBtn = document.querySelector(".resetBtn");
const timerContainer = document.querySelector(".timer");
const icon = document.querySelector(".resetBtn i");

// time values variables
let seconds = 0;
let minutes = 0;
let hours = 0;

// timer interval and timer status
let intervalId = null;

// stopwatch function

function stopWatch() {
  seconds++;

  if (seconds === 60) {
    seconds = 0;
    minutes++;

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  timerContainer.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // String() - this converts a number primitive value to a string the same way a Number() object does.
  // .padStart - this adds the 0 in front of a number. We need these leading zeros so that our stopWatch would work like one.
}

startStopBtn.addEventListener("click", function () {
  if (intervalId === null) {
    intervalId = window.setInterval(stopWatch, 1000);
    startStopBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    startStopBtn.classList.add("pauseBtn");
  } else {
    clearInterval(intervalId);
    intervalId = null;
    startStopBtn.classList.remove("pauseBtn");
    startStopBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
  icon.classList.remove("active");
});

resetBtn.addEventListener("click", function () {
  if (intervalId === null) {
    icon.classList.add("active");
    clearInterval(intervalId);
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerContainer.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
});

// When we reset the button, we attached the 'active' class that triggers the animation. That is why when we click the reset button again, animation does not happen for the second time.
// My solution is that everytime we start the stopwatch, we remove the 'active' class so that the animation can happen again when we click the reset button
