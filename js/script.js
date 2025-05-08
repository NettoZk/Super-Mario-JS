const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score');

let isJumping = false;
let score = 0;
let gameOver = false;

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

    // Atualiza pontuação enquanto o jogo está rodando
    if (!gameOver) {
        score++;
        scoreElement.textContent = score;
    }

    // Colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver = true;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        const loserImage = document.querySelector('.loser');
        loserImage.classList.add('show');

        const overlay = document.querySelector('.overlay');
        overlay.classList.add('show');


        clearInterval(loop);
    }
}, 10); // <- FECHA o setInterval corretamente aqui!

// Listener fora do loop
document.addEventListener('keydown', (e) => {
    if (gameOver) {
        location.reload(); // Reinicia o jogo ao apertar qualquer tecla
    } else {
        jump();
    }
});