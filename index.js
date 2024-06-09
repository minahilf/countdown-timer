import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
//formating
const format = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    //because padStart is a string method, and we need to convert numbers to  string in order to use it
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
// seconds timer
const secondTimer = async () => {
    const input = await inquirer.prompt({
        type: "number",
        name: "seconds",
        message: "Enter the number of seconds: ",
        validate: (input) => {
            if (isNaN(Number(input))) {
                return "Please enter valid number";
            }
            else if (Number(input) > 60) {
                return "seconds must be in 60 or less";
            }
            else {
                return true;
            }
        }
    });
    let second = Number(input.seconds);
    const startTime = (sec) => {
        const intialTime = new Date().setSeconds(new Date().getSeconds() + sec);
        const endTime = new Date(intialTime);
        setInterval(() => {
            const currentTime = new Date();
            const timeDifference = differenceInSeconds(endTime, currentTime);
            if (timeDifference <= 0) {
                console.log("Times Up!");
                process.exit();
            }
            else {
                console.log(format(timeDifference));
            }
        }, 1000);
    };
    startTime(second);
};
// minutes timer
const minutesTimer = async () => {
    const input = await inquirer.prompt({
        type: "number",
        name: "minutes",
        message: "Enter number of minutes: ",
        validate: (input) => {
            if (isNaN(Number(input))) {
                return 'Please enter valid number';
            }
            else if (Number(input) > 60) {
                return 'minutes must be in 60 or less';
            }
            else {
                return true;
            }
        }
    });
    const minutes = Number(input.minutes);
    const totalSeconds = minutes * 60;
    const initialTime = new Date();
    const endTime = new Date(initialTime.getTime() + minutes * 60000);
    setInterval(() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(endTime, currentTime);
        if (timeDifference <= 0) {
            console.log("Times Up!");
            process.exit();
        }
        else {
            console.log(format(timeDifference));
        }
    }, 1000);
};
// hours timer
const hourTimer = async () => {
    const input = await inquirer.prompt({
        type: "number",
        name: "hours",
        message: "Enter number of hours: ",
        validate: (input) => {
            if (isNaN(Number(input))) {
                return 'Please enter valid number';
            }
            else if (Number(input) > 24) {
                return 'Hours must be 24 or less';
            }
            else {
                return true;
            }
        }
    });
    const hours = Number(input.hours);
    const totalSeconds = hours * 3600;
    const initialTime = new Date();
    const endTime = new Date(initialTime.getTime() + hours * 3600000);
    setInterval(() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(endTime, currentTime);
        if (timeDifference <= 0) {
            console.log("Times Up!");
            process.exit();
        }
        else {
            console.log(format(timeDifference));
        }
    }, 1000);
};
// Asking users 
const input = await inquirer.prompt({
    type: "list",
    name: "CountDownTimerList",
    message: "Choose the countdown Timer you want to use",
    choices: ["Seconds", "Minutes", "Hours"]
});
const countdownTimer = input.CountDownTimerList.toLowerCase();
switch (countdownTimer) {
    case "seconds":
        secondTimer();
        break;
    case "minutes":
        minutesTimer();
        break;
    case "hours":
        hourTimer();
        break;
    default:
        console.log("Invalid Option");
}
