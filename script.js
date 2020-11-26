// const { start } = require("repl");

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0]; // min, secs, hundreath of sec, thousandth of sec
var interval;
var timerRunning = false; //when script orignally loads timmer is not running 


// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <=9) {
        time = "0" + time; //converts value inside time to string
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);  // defines minutes | timer[3] - thousandth of a second
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));  // defines seconds and resets value to zero every 60 seconds 
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));  //defines the hundreth of a second, resets every time the minutes reaches 100 so we dont count upwards from there

}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEnterd = testArea.value;
    let originTextMatch = originText.substring(0, textEnterd.length)  // tests to see if the string inside test area matches the string outside test area
    
    if (textEnterd == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890"
    } else {
        if (textEnterd == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
    console.log(textEnterd);
}

// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
       interval = setInterval(runTimer, 10); //runs function every thousandth of a second
    }
    console.log(textEnterdLength);
}

// Reset everything:
function reset() {
    clearInterval(interval); // insures browser is not running and interval in background after we start a new one
    interval = null; // prevents setting a new interval with new index number 
    timer = [0,0,0,0]; // sets timer array back to zero
    timerRunning = false; //sets up a new interval and runs clock again

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);

//steps of logic
// 1. detaect the first key stroke 
// 2. match string of text entered with the string above - count the number of letters in the input and the string and make sure they match 
// 3. set up reset button
// 4. trigger clock at the right time
// 5. line 9, lines 17 and 19 - break the timmer into hundreth of a seconds, seconds and minutes, and then store independently so we can carry values from one to the other
// 6. displays the different time values by doing math 
      // floor - means you dont return decimals
// 7. convert any single digit numbers, convert them to a strring and add a zero infront of it
// 8. change border color to match status of matched text in test area
// 9. stop the clock by stoping the interval
