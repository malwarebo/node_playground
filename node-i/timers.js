const waitTime = 3000;
const waitInterval = 500;
let currentTime = 0;

const incTime = () => {
    currentTime += waitInterval;
    console.log(`waiting ${currentTime / 1000} seconds`);
};
console.log(`setting a ${waitTime / 1000} second delay`);

const timerFinished = () => {
    clearInterval(interval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log("done");
};
const interval = setInterval(incTime, waitInterval);
setTimeout(timerFinished, waitTime);