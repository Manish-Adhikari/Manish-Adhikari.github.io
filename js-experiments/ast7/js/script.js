const canvas = document.querySelector('canvas');
canvas.width = 400;
canvas.height = 460;
canvas.style.margin = 'auto';
canvas.style.display = 'block';
canvas.style.border = '1px solid black';
canvas.style.backgroundColor = '#000b'
const context = canvas.getContext('2d');

let bird
let tolerance;
let score;
let constTerm;
let pipe = [];

const gameOverImage = new Image();
const upperPipe = new Image();
const lowerPipe = new Image();
const flySound = new Audio();
const scoreSound = new Audio();

gameOverImage.src = 'images/gameover.png'
upperPipe.src = 'images/pipeNorth.png';
lowerPipe.src = 'images/pipeSouth.png';
flySound.src = 'sounds/fly.mp3';
scoreSound.src = 'sounds/score.mp3';

class createBird {
    constructor() {
        this.y = 200;
        this.x = 58;
        this.radius = 12;
        this.gravity = 0.4;
        this.velocity = -0.6;
        this.liftForce = 6.5;
    }

    show() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = 'red';
        context.fillStyle = 'white';
        context.stroke();
        context.fill();
    }

    spaceUp() {
        this.velocity = -this.liftForce;

    }

    birdPositionUpdate() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.show();

    }
}

const updatePipes = () => {
    constTerm = upperPipe.height + tolerance;
    for (var i = 0; i < pipe.length; i++) {
        context.drawImage(upperPipe, pipe[i].x, pipe[i].y);
        context.drawImage(lowerPipe, pipe[i].x, pipe[i].y + constTerm);
        pipe[i].x--;

        if (pipe[i].x == 225) {
            pipe.push({
                x: canvas.width + 10,
                y: Math.floor(Math.random() * upperPipe.height) - (upperPipe.height - 10)
            });
        }

        if (bird.x + bird.radius >= pipe[i].x &&
            bird.x <= pipe[i].x + upperPipe.width &&
            (bird.y - bird.radius <= pipe[i].y + upperPipe.height ||
                bird.y + bird.radius >= pipe[i].y + constTerm) ||
            bird.y > canvas.height) {

            intialConditon();
       
        }

        if (pipe[i].x == 4) {
            score++;
            scoreSound.play();
        }
    }
}

const scoreUpdate = () => {
	context.fillstyle = "#000";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 0, canvas.height);
}

const keyPressed = (key) => {
    if (key.keyCode == 32) {
        bird.spaceUp();
        flySound.play();
    }
}

window.addEventListener('keydown', keyPressed);

const intialConditon = () => {
    bird = new createBird();
    pipe = [];
    pipe[0] = {
        x: canvas.width,
        y: 0
    };
    score = 0;
    constTerm;
    tolerance = 100;
}

intialConditon();

const animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    bird.birdPositionUpdate();
    updatePipes();
    scoreUpdate();
}

animate(); 
