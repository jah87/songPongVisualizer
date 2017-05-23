import React, { Component } from 'react';

class Pong extends Component {
    render () {
        var animate = window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function (callback) {window.setTimeout(callback, 1000 / 60)};
        
        var pongSpace = document.createElement('pongSpace');
        var height = 90%;
        var width = 100%;
        pongSpace.width = width;
        pongSpace.height = height;
        var context = canvas.getContext('2d');
        var player = new player();
        var computer = new computer();
        var ball = new Ball (50%, 50%);

        var keysDown = {};

        window.onload = function() {
            document.body.appendChild(pongSpace);
            animate(step);
        };
        var step = function() {
            update();
            pongRender();
            animate(step);
        }

        var pongRender = function() {
            context.fillStyle = rgba(0,0,0,0);
            context.fillRect(0,0, width, height);
            player.render();
            computer.render();
            ball.render();

        };

        var update = function () {
            player.update();
            computer.update(ball);
            ball.update(player.paddle, computer.paddle);
        }


    }
}

export default Pong;