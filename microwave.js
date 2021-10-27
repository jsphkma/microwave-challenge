

/********************************************
            Global Variables
*********************************************/
var timer;              // Microwave Timer
var display="";
var getMicrowaveDisplay = document.getElementById("txtNumber");
var mCounter;           // Minutes Counter
var sCounter;           // Seconds Counter
var flashTimer;         // Timer to blink when done
var flashColor="white";
var flashCounter = 4;   // The last blink to display DONE
var doFlash = false;

var index = 4;
var MAXLENGTH = 4;


/********************************************
            Functions
*********************************************/

//FUNCTION TO DISPLAY NUMBER

function addNumber(buttonElement){

    var currentDisplay = getMicrowaveDisplay.value;
    var newNumber = document.getElementById(buttonElement.id).value;
    var updatedDisplay;
    if(getMicrowaveDisplay.value.length ==  5)
    {
        if (index >=0)
        {
            if (currentDisplay.charAt(index) == ":")
            {
                index --;
                updatedDisplay = addNumToStr(currentDisplay,index,newNumber);
                getMicrowaveDisplay.value = updatedDisplay;


            }
            else {
                updatedDisplay = addNumToStr(currentDisplay,index,newNumber);
                getMicrowaveDisplay.value = updatedDisplay;
            }


        }
    }
}

/*
    function: addNumToStr();
    parameters: A string, index i of  where to replace the new added number , and the number value
    Description: This function replaces a new input number to the microwave display and properly places the new number starting from last index of the string

    Note: The funcion properly manges the existance of the colon ":" and correctly displays the minutes and seconds*/

function addNumToStr(str,i,newNumber)
{

    var inputStrArr = str.split("");
    var updatedString;
    for(var j=i; j<MAXLENGTH;j++)
    {
        if (inputStrArr[j] == ":")
        {
            inputStrArr[j-1]= inputStrArr[j+1];
        }
        else {
            inputStrArr[j]=inputStrArr[j+1];
        }


    }
    inputStrArr[MAXLENGTH] = newNumber;
    updatedString = inputStrArr.join("");

    index --;
    return updatedString;
}


//Simple animation
function microwaveAnimation() {

  var getMicrowave = document.getElementById("foodDisplay");


  if(doFlash == false) {


  getMicrowave.classList.remove('microwave-animation');



  return false;

} else if(doFlash == true) {

  getMicrowave.classList.add('microwave-animation');

  }

}


// CLEAR ALL FUNCTION
function clearAll() {
    window.location.reload();
}


// START AND STOP FUNCTION
function startTimer(){

    if (getMicrowaveDisplay.value == "00:00")
    {
        // Do nothing
    }
    else {

            // Disable The start Button and the number buttons

            document.getElementById('startBtn').disabled = true;
            document.getElementById('startBtn').style.color="grey";

            for (var i = 0; i <=9; i++) {
                document.getElementById(i).disabled = true;
                document.getElementById(i).style.color="grey";
            }
            var inputTime = document.getElementById('txtNumber').value;
            var minsAndSeconds;

            minsAndSeconds =  inputTime.split(":");
            mCounter = minsAndSeconds[0];
            sCounter = minsAndSeconds[1];


            timer = setInterval(CountDown,1000);

    }

}

// FUNCTION TO COUNT DOWN THE TIMER

function CountDown()
{
    if (mCounter >=0)
    {
        if (sCounter >0)
        {
            sCounter--;
            if (sCounter <= 9)
            {
                sCounter = "0"+sCounter;
            }
            document.getElementById('txtNumber').value= mCounter +":"+sCounter;
        }
        if (sCounter == 0)
        {
            if (mCounter == 0)
            {
                //If the timer count is zero, add logic to do the beeping
                doFlash = true;
                stopTimer();
                microwaveAnimation();

            }
            else {
                mCounter--;
                if (mCounter <= 9) {
                    mCounter = "0"+mCounter;

               }
                sCounter = "59";
                document.getElementById('txtNumber').value= mCounter +":"+sCounter;
            }


       }

   }

}

function stopTimer(){

    // Enable Start buttonElement
    document.getElementById('startBtn').disabled = false;
    document.getElementById('startBtn').style.color="white";

        clearTimeout(timer);

   if (doFlash == true)
    {
        flashTimer = setInterval(timeOutFlash, 1000);

   }

}

// FUNCTION TO BLINK
function timeOutFlash() {

        document.getElementById('txtNumber').value = "DONE";

        if (flashCounter == 0)
        {
            clearTimeout(flashTimer);
        }
        else {
            if (flashColor == "red")
            {

               flashColor = "white"
            }
            else {
                flashColor = "red";
                flashCounter --;


           }
               document.getElementById('txtNumber').style.backgroundColor = flashColor;

        }
    }

// FUNCTION TO
function displayZero() {
  getMicrowaveDisplay.value = "00:00";
  if(getMicrowaveDisplay.value >=60){
      getMicrowaveDisplay.value = "00:00";

  }

}

displayZero();
