// script.js

document.getElementById('start-timer').addEventListener('click', startTimer);
const activeTimers = [];
let timerId = 0;

function startTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Validate user input
    if (hours < 0 || minutes < 0 || seconds < 0 || (hours === 0 && minutes === 0 && seconds === 0)) {
        alert('Please enter a valid time.');
        return;
    }

    const totalTime = (hours * 3600) + (minutes * 60) + seconds;
    const timer = {
        id: timerId++,
        timeRemaining: totalTime,
        intervalId: null,
    };

    activeTimers.push(timer);
    updateActiveTimersDisplay();
    startCountdown(timer);
}

function startCountdown(timer) {
    timer.intervalId = setInterval(() => {
        if (timer.timeRemaining > 0) {
            timer.timeRemaining--;
            updateActiveTimersDisplay();
        } else {
            clearInterval(timer.intervalId);
            alertEnd(timer);
        }
    }, 1000);
}

function updateActiveTimersDisplay() {
    const display = document.getElementById('active-timers');
    display.innerHTML = '';

    activeTimers.forEach(timer => {
        const timeDisplay = formatTime(timer.timeRemaining);
        const timerDiv = document.createElement('div');
        timerDiv.className = 'timer';
        timerDiv.innerHTML = `
            <span>${timeDisplay}</span>
            <button data-id="${timer.id}" onclick="stopTimer(this)">Stop Timer</button>
        `;
        display.appendChild(timerDiv);
    });
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function stopTimer(button) {
    const id = parseInt(button.getAttribute('data-id'));
    const timerIndex = activeTimers.findIndex(timer => timer.id === id);
    if (timerIndex !== -1) {
        clearInterval(activeTimers[timerIndex].intervalId);
        activeTimers.splice(timerIndex, 1);
        updateActiveTimersDisplay();
    }
}

function alertEnd(timer) {
    const display = document.getElementById('active-timers');
    const timerDiv = display.children[timer.id];
    if (timerDiv) {
        timerDiv.className = 'timer timer-ended';
        timerDiv.innerHTML = `Time's up! <button onclick="stopTimer(this)">Remove</button>`;
    }
    document.getElementById('alert-sound').play();
}
