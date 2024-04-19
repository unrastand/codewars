const questions = [
  {
    question: "who wrote the code for this game?",
    options: ["Paris", "Elon", "Engr. Israel", "Israel"],
    correctAnswerIndex: 2
  },
  {
    question: "The developer was supported by?",
    options: ["Paris", "India", "Tokyo", "A.I"],
    correctAnswerIndex: 1
  },
  {
    question: "If two pulleys are used in a system the force required will? ",
    options: ["Be doubled", "Reduce by half", "Won't change", "ask A.I"],
    correctAnswerIndex: 1
  },
  
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correctAnswerIndex: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswerIndex: 0
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
    correctAnswerIndex: 0
  },{
    question: "What iconic movie features the line, 'May the Force be with you'?",
    options: ["Star Wars", "Star Trek", "Guardians of the Galaxy", "Interstellar"],
    correctAnswerIndex: 0
  },
  {
    question: "Which sport is associated with the term 'birdie'?",
    options: ["Tennis", "Golf", "Badminton", "Table tennis"],
    correctAnswerIndex: 1
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "CH4"],
    correctAnswerIndex: 0
  },
  {
    question: "Which river is the longest in the world?",
    options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    correctAnswerIndex: 0
  },
  {
    question: "What liqueur is used to make a classic Margarita cocktail?",
    options: ["Vodka", "Tequila", "Rum", "Gin"],
    correctAnswerIndex: 1
  }
];


const colors = ['#ff0000','#00ff00','#000ff','#ffff00','#00ffff'];

const fireworks =[];
const canvas = document.getElementById('firework');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let currentQuestionIndex = 0;
let score = 0;
let timer =0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score-value');
const nextButton = document.getElementById('next-btn');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
const clicksound = document.getElementById('clickSound');
const modal = document.getElementById('gameOver');
const closeButton = document.querySelector('.close'); //chek if its .close or close
const levelSelect = document.getElementById('difficulty');
const audio = new Audio("pas.mp3");

 
const confirmationModal = document.getElementById('confirmationModal');
const confirmYesButton = document.getElementById('confirmYes');
const confirmNoButton = document.getElementById('confirmNo');
  

const level1 = 10;
const level2= 8;
const level3= 6;
const level4= 4;
let timeLeft = 10; 
 
function restartgame(){
  confirmationModal.style.display = 'block';   
 
}

function displayQuestion() {
  levelselect();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option-btn');
    button.addEventListener('click', () => {
      handleAnswer(index); 
      levelSelect.style.display = 'none';  
    });
    optionsElement.appendChild(button);
  });
  startTimer();
}

function handleAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.correctAnswerIndex) {
    score++;
    //add the sound here
  }
  else{
    goToNextQuestion();
    playAudio();
  }
  scoreElement.textContent = score.toString();
  goToNextQuestion();
}

function goToNextQuestion() {
  clearTimeout(timer);
  levelselect();
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    levelselect();
  } else {
     showModal();
    setInterval(function(){createFireworks();
    animate();},1000);
     //alert(`Quiz completed! Your final score is ${score}`);
    //add audio and alert here
  }

}

function startTimer(){   
  updateTimerdisplay(timeLeft);
  timer = setInterval(() =>{
    if(timeLeft > -1){timeLeft--;}
    updateTimerdisplay(timeLeft);
    if(timeLeft===-1){
      goToNextQuestion();
    }
  },1000)
}

function updateTimerdisplay(timeLeft){
  const timerElement = document.getElementById('timer')
  if(timerElement){
    if(timeLeft<0){
      timeLeft = 0;
    }
    timerElement.textContent=`Time left: ${timeLeft} seconds`;
    if(timeLeft===0){
      timerElement.textContent=`Time is Up`;
    }
  }
}

function showModal(){
  modal.style.display='block';
}

function playAudio(){
  audio.play();
  audio.controls(false);
  //audio.addTextTrack(TextTrack,"dey play","en") //check later
}

function levelselect(){
  switch(levelSelect.value){
    case 'Very Easy':
      timeLeft = level1;
      break;
    case 'Easy':
      timeLeft = level2;
      break;
    case 'Medium':
      timeLeft = level3;
      break;
    case 'Hard':
      timeLeft = level4;
      break;
    default:
      timeLeft = level1;
    }
  }
  

//to create a firework
function Firework(){
  this.x = Math.random()*canvas.width;
  this.y = canvas.height;
  this.vx = Math.random()*6-3;
  this.vy = Math.random()* -15 -10;
  this.color = colors[Math.floor(Math.random()*colors.length)];
  this.size = Math.random()*3+1;

  this.update = function(){
    this.x += this.vx;
    this.y += this.vy;
    this.vy += .2;

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function createFireworks(){
  for(let i=0; i<20;i++){//increase fireworks length
    fireworks.push(new Firework());
  }
} 

function animate(){
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0,0, canvas.width, canvas.height);
//draw fire
  for(let i= fireworks.length-1; i>=0; i--){
    fireworks[i].update();
    
    if(fireworks[i].y<0){
      fireworks.splice(i,1);
    }
  }
  var background = new Image();
  background.src = 'R.JFIF';
  background.onload = function(){
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
  }
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Quiz completed! Your final score is ${score}`,canvas.width/2-150,canvas.height/2);

  ctx.fillStyle = 'red';
  ctx.fillRect(canvas.width/2-50,canvas.height/2+20,100,40);
  ctx.fillStyle = 'blue';
  ctx.font = '20px Arial';
  ctx.fillText('  OK',canvas.width/2-30,canvas.height/2+45);
}

function startGame(){
  startButton.style.display = 'none';   // to remove element  
  levelselect();
  levelSelect.style.display = 'none';
  // Initial display
  displayQuestion();
  nextButton.addEventListener('click', goToNextQuestion);
  restartButton.addEventListener('click',restartgame);
  closeButton.addEventListener('click',()=>{modal.style.display='none'; // put where the last question is selscted
  });
}

  
 // Add click event listener to the "Yes" button in the modal
confirmYesButton.addEventListener('click', function() {
   // Hide modal   
  confirmationModal.style.display = 'none';
   // Execute instructions
    //inprogress =0;
    currentQuestionIndex = -1;
    levelSelect.style.display = 'block';
    score =0;
    scoreElement.textContent = score.toString();
  /*  setInterval(() =>{
      levelSelect.style.display = 'none'; 
      
    },5000)*/
    goToNextQuestion();
    levelselect();
 });
 
startButton.addEventListener('click',startGame) ;

 // Add click event listener to the "No" button in the modal
confirmNoButton.addEventListener('click', function() {
   // Hide modal
  confirmationModal.style.display = 'none';   
  });

  // for gameover add fireworks too

  // Event.preventDefault(); pause whole screen
  canvas.addEventListener('click',function(event){
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX-rect.left;
    var mouseY = event.clientY- rect.top;
    const buttonX = canvas.width/2-50;
    const buttonY = canvas.height/2+20;
    const buttonWidth = 100;
    const buttonHeight = 40;
    if(mouseX >= buttonX && mouseX <= buttonX +buttonWidth && mouseY>=buttonY && mouseY<=buttonY+buttonHeight){
      location.reload();
    }
  });
  background.onload = function(){
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
  }