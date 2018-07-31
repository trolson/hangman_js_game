//touch any key to start game

//Array of words
var words = ["Tunisia", "Argentina", "Uruguay", "Colombia", "Switzerland", 
"Senegal", "Iceland", "England", "Spain", "Germany", "Serbia", "Croatia"];

//pick a random word from array
var wordOG = words[Math.floor(Math.random() * words.length)];
//make word all lowercase
var word = wordOG.toLowerCase();
console.log(word);

//Set up answer array
var answerArray = [];
//store letters of random word
var wordLetters = [];
//Missed guesses array word bank
var missedArray = [];
//store all used chars
var usedArray = [];

var missedLetters = "";

var remainingChar = word.length;

var lives = 9;

var isWinner  = 0;

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")

//Push underscores into answerArray
for(var i = 0; i < word.length; i++) {
    answerArray.push("_");   
    wordLetters.push(word.charAt(i));
    console.log(wordLetters);
}

//pre-event Canvas
ctx.beginPath();
ctx.moveTo(10,310);
ctx.lineWidth = 4;
ctx.strokeStyle = 'black';
ctx.lineCap = 'round';
ctx.lineTo(180,310);
ctx.stroke();



document.getElementById("new-word").innerHTML = 
    "<h2>" + answerArray.join(" ") + "</h2>" 

document.getElementById("charsremaining").innerHTML = 
    "<p> characters remaining: " + remainingChar + "</p>"

document.getElementById("livesleft").innerHTML = 
    "<p> lives remaining: " + lives + "</p>"

// //Capture User Guess and set up conditionals
document.addEventListener('keypress', function(input) {
    var letter = input.key;
    if (usedArray.includes(letter)) {
        //alert("letter already entered, please try something new.");
    }
    else {
        usedArray.push(letter);

        //check if letter is in word
        if (word.includes(letter)) {
            for(var j = 0; j < word.length; j++) {        
                if (wordLetters[j] === letter) {
                    answerArray[j] = letter;
                    remainingChar--;
                    if (remainingChar == 0) {
                        isWinner = 1;
                    }
                }
            }
        }
        else {
            missedLetters += letter + ", ";
            document.getElementById("usedChars").innerHTML =
            "<h3 style=color:red>" + missedLetters + "</h3>"//doesnt quite work doesnt append

            if (lives > 0) {
                lives--;
            }
            else if (lives === 0) {                
                isWinner = -1;
            }            
        }
    }


document.getElementById("new-word").innerHTML = 
    "<h2>" + answerArray.join(" ") + "</h2>" 

document.getElementById("charsremaining").innerHTML = 
    "<p> characters remaining: " + remainingChar + "</p>"

document.getElementById("livesleft").innerHTML = 
    "<p> lives remaining: " + lives + "</p>"




//Canvas  
const vertices = [
    {x:90, y:310},
    {x:90, y:62},
    {x:182, y:62},
    {x:182, y:109},
    {x:182, y:172},
    {x:182, y:240},
    {x:162, y:270},
    {x:182, y:240},
    {x:202, y:270},
    {x:182, y:200},
    {x:162, y:215},
    {x:182, y:200},
    {x:202, y:215}
  ]
  
  const radians = [
    {r0: 0},
    {r1: 2 * Math.PI}
  ]

  //animation logic for Hangman Draw
  if(lives == 8) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 2;
    }))
  }
  else if(lives == 7) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 3 && index > 0;
    }))
  }
  else if(lives == 6) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 4 && index > 1;
    }))
  }
  else if(lives == 5 ) {
    animateDrawArc(radians,182,140,25, true)
  }
  else if(lives == 4) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 6 && index > 3;
    }))
  }
  else if(lives == 3) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 7 && index > 4;
    }))
  }
  else if(lives == 2) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 9 && index > 6;
    }))
  }
  else if(lives == 1) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 11 && index > 8;
    }))
  }
  else if(lives == 0) {
    animateLineDraw(vertices.filter((point, index) => {
      return index < 13 && index > 10;
    }))
    isWinner = -1;
  }
  
if (isWinner == 1){
    document.getElementById("outcome").innerHTML =
    "<h2>You Win!</h2>"
    document.getElementById("outcome").style = "color: green; background-color:rgba(0, 255, 0, 0.1); border-radius: 8px"
}

if (isWinner == -1){
    document.getElementById("outcome").innerHTML =
    "<h2>You Lose...</h2>"
    document.getElementById("outcome").style = "color: red; background-color:rgba(255, 0, 0, 0.1); border-radius: 8px"
}
  //animation functions
function animateLineDraw(vertices) {
  const wayPoints = [ ]
  for(let i = 1; i < vertices.length; i++) {
    //find distance between each point
    const pt1 = vertices[i-1];
    const pt2 = vertices[i];
    const dx = pt2.x - pt1.x;
    const dy = pt2.y - pt1.y; 
    //create individual waypoints
      for(let n = 0; n < 50; n++) {
        const x = pt1.x + dx * n/50;
        const y = pt1.y + dy * n/50;
        wayPoints.push({x:x, y:y})
      }
    }
  let a = 1
  function draw() {
      //create Animation Frame
      if(a < wayPoints.length - 1) { 
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.moveTo(wayPoints[a - 1].x, wayPoints[a - 1].y);
        ctx.lineTo(wayPoints[a].x, wayPoints[a].y);
        ctx.stroke();
        a++
        requestAnimationFrame(draw) 
      }  
    }
    requestAnimationFrame(draw);
}   

function animateDrawArc(radians, x, y, r) {
  const wayPoints = [ ];
  for(let i = 1; i < radians.length; i++) {
    //find distance between each point
    const rd0 = radians[i-1];
    const rd1 = radians[i];
    const dr = rd1.r1 - rd0.r0;
    //create individual waypoints
      for(let n = 0; n < 50; n++) {
        const r = rd0.r0 + dr * n/50;
        wayPoints.push({rd:r})
      }
    }
  let a = 1
  function draw() {
      //create Animation Frame
      if(a < wayPoints.length - 1) { 
        const lineWidth = 4
        ctx.strokeStyle = 'black';
        ctx.clearRect(x - r - lineWidth, y - r - lineWidth, r * 2 + lineWidth * 2, r * 2 + lineWidth * 2); 
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.arc(x,y,r,0,wayPoints[a].rd)
        ctx.stroke();
        ctx.closePath();
        a++
        requestAnimationFrame(draw)
      }  
    }
    requestAnimationFrame(draw);
  }
  //update alreadyPressed
});
        


