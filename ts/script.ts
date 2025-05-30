// src/main.ts

const mario = document.querySelector('.mario') as HTMLImageElement;
const pipe = document.querySelector('.pipe') as HTMLImageElement;
const scoreElement = document.getElementById('score') as HTMLElement;
const loserImage = document.querySelector('.loser') as HTMLImageElement;
const overlay = document.querySelector('.overlay') as HTMLDivElement;
const hiScoreElement = document.getElementById('hi-score') as HTMLElement;  

let isJumping: boolean = false;
let score: number = 0;
let hiScore: number = Number(localStorage.getItem('hiScore')) || 0;
let gameOver: boolean = false;

hiScoreElement.textContent = hiScore.toString();    

const jump = (): void => {
    if (isJumping || gameOver) return;

    isJumping = true;
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
        isJumping = false;
    }, 500);
};

const loop = setInterval(() => {
    const pipePosition: number = pipe.offsetLeft;
    const marioPosition: number = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (!gameOver) {
        score++;
        scoreElement.textContent = score.toString();
        if (score > hiScore) {
            hiScore = score;
            localStorage.setItem('hiScore', hiScore.toString());
            hiScoreElement.textContent = hiScore.toString();
        }
    }
    

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver = true;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        loserImage.classList.add('show');
        overlay.classList.add('dark');

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (gameOver) {
        location.reload();
    } else {
        jump();
    }
});
