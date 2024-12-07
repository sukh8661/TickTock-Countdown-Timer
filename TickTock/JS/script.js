const startBtn = document.getElementById("startBtn");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const countdownDisplay = document.getElementById("countdown");
const message = document.getElementById("message");

const stopBtn = document.createElement("button");
stopBtn.textContent = "Stop Countdown";
stopBtn.id = "stopBtn";
document.querySelector(".timer-inputs").appendChild(stopBtn);

const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Countdown";
resetBtn.id = "resetBtn";
document.querySelector(".timer-inputs").appendChild(resetBtn);

let countdownInterval;

startBtn.addEventListener("click", () => {
    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;

    if (!selectedDate || !selectedTime) {
        message.textContent = "Please select both date and time.";
        return;
    }

    const targetDateTime = new Date(`${selectedDate}T${selectedTime}`);
    if (isNaN(targetDateTime.getTime())) {
        message.textContent = "Invalid date or time. Please try again.";
        return;
    }

    startCountdown(targetDateTime);
});

stopBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    message.textContent = "Countdown stopped.";
});

resetBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = "00:00:00:00";
    message.textContent = "Countdown reset.";
    dateInput.value = "";
    timeInput.value = "";
});

function startCountdown(targetDateTime) {
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = targetDateTime - currentTime;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "00:00:00:00";
            message.textContent = "Time's up!";
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        countdownDisplay.textContent = `${formatTime(days)}:${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
