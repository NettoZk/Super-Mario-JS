"use strict";
// src/main.ts
var mario = document.querySelector('.mario');
var pipe = document.querySelector('.pipe');
var scoreElement = document.getElementById('score');
var loserImage = document.querySelector('.loser');
var overlay = document.querySelector('.overlay');
var isJumping = false;
var score = 0;
var gameOver = false;
var jump = function () {
    if (isJumping || gameOver)
        return;
    isJumping = true;
    mario.classList.add('jump');
    setTimeout(function () {
        mario.classList.remove('jump');
        isJumping = false;
    }, 500);
};
var loop = setInterval(function () {
    var pipePosition = pipe.offsetLeft;
    var marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    if (!gameOver) {
        score++;
        scoreElement.textContent = score.toString();
    }
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver = true;
        pipe.style.animation = 'none';
        pipe.style.left = "".concat(pipePosition, "px");
        mario.style.animation = 'none';
        mario.style.bottom = "".concat(marioPosition, "px");
        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        loserImage.classList.add('show');
        overlay.classList.add('dark');
        clearInterval(loop);
    }
}, 10);
document.addEventListener('keydown', function (e) {
    if (gameOver) {
        location.reload();
    }
    else {
        jump();
    }
});
