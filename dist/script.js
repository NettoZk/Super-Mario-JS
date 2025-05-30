const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score');
const hiScoreElement = document.getElementById('hi-score');
const loserImage = document.querySelector('.loser');
const overlay = document.querySelector('.overlay');

let isJumping = false;
let score = 0;
let gameOver = false;

// Recupera hi-score do localStorage ou define como 0
let hiScore = localStorage.getItem('hiScore') || 0;
hiScoreElement.textContent = hiScore;

const jump = () => {
    if (isJumping || gameOver) return;

    isJumping = true;
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
        isJumping = false;
    }, 500);
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (!gameOver) {
        score++;
        scoreElement.textContent = score.toString();
    }

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver = true;

        // Salva o hi-score se o jogador bater o recorde
        if (score > hiScore) {
            hiScore = score;
            localStorage.setItem('hiScore', hiScore);
            hiScoreElement.textContent = hiScore;
        }

        // Parar animações
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // Altera sprite do Mario
        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // Mostrar tela de derrota
        loserImage.classList.add('show');
        overlay.classList.add('dark');

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', () => {
    if (gameOver) {
        location.reload();
    } else {
        jump();
    }
});
