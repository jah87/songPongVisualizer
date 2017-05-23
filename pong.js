var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
var canvas = document.getElementById("pong");
var width = 600;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var player = new Player();
var computer = new Computer();
var ball = new Ball((window.height/2), (window.width/2));

var keysDown = {};

var render = function () {
    context.fillStyle = "rgba(134, 226, 180, 0.1)";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
};

var update = function () {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
};

var step = function () {
    update();
    render();
    animate(step);
};

function Paddle(y, x, width, height) {
    this.y = x;
    this.x = y;
    this.width = width;
    this.height = height;
    this.y_speed = 0;
    this.x_speed = 0;
}

Paddle.prototype.render = function () {
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.y, this.x, this.width, this.height);
};

Paddle.prototype.move = function (y, x) {
    this.y += x;
    this.x += y;
    this.y_speed = y;
    this.x_speed = x;
    if (this.x < 0) {
        this.x = 0;
        this.y_speed = 0;
    } else if (this.x + this.height > 600) {
        this.x = 600 - this.height;
        this.y_speed = 0;
    }
};

function Computer() {
    this.paddle = new Paddle(175, 10, 10, 50);
}

Computer.prototype.render = function () {
    this.paddle.render();
};

Computer.prototype.update = function (ball) {
    var y_pos = ball.y;
    var diff = -((this.paddle.y + (this.paddle.width / 2)) - y_pos);
    if (diff < 0 && diff < -4) {
        diff = -5;
    } else if (diff > 0 && diff > 4) {
        diff = 5;
    }
    this.paddle.move(diff, 0);
    if (this.paddle.y < 0) {
        this.paddle.y = 0;
    } else if (this.paddle.y + this.paddle.width > 600) {
        this.paddle.y = 600 - this.paddle.width;
    }
};

function Player() {
    this.paddle = new Paddle(175, 580, 10, 50);
}

Player.prototype.render = function () {
    this.paddle.render();
};

Player.prototype.update = function () {
    for (var key in keysDown) {
        var value = Number(key);
        if (value == 38) {
            console.log("38 hit / up");
            this.paddle.move(-4, 0);
        } else if (value == 40) {
            this.paddle.move(4, 0);
            console.log("40 hit / down")
        } else {
            this.paddle.move(0, 0);
        }
    }
};

function Ball(y, x) {
    this.y = y;
    this.x = x;
    this.y_speed = 3;
    this.x_speed = 0;
}

Ball.prototype.render = function () {
    context.beginPath();
    context.arc(this.y, this.x, 5, 2 * Math.PI, false);
    context.fillStyle = "#FFFFFF";
    context.fill();
};

Ball.prototype.update = function (paddle1, paddle2) {
    this.x += this.y_speed;
    this.y += this.x_speed;
    var top_y = this.x - 5;
    var top_x = this.y - 5;
    var bottom_y = this.x + 5;
    var bottom_x = this.y + 5;

    if (this.y - 5 < 0) {
        this.y = 5;
        this.y_speed = -this.y_speed;
    } else if (this.y + 5 > 400) {
        this.y = 395;
        this.y_speed = -this.y_speed;
    }

    if (this.x < 0 || this.x > 600) {
        this.x_speed = 0;
        this.y_speed = 3;
        this.y = 200;
        this.x = 300;
    }

    if (top_x > 300) {
        if (top_x < (paddle1.x + paddle1.height) && bottom_x > paddle1.x && top_y < (paddle1.y + paddle1.width) && bottom_y > paddle1.y) {
            this.x_speed = -3;
            this.y_speed += (paddle1.y_speed / 2);
            this.x += this.x_speed;
        }
    } else {
        if (top_x < (paddle2.x + paddle2.height) && bottom_x > paddle2.x && top_y < (paddle2.y + paddle2.width) && bottom_y > paddle2.y) {
            this.x_speed = 3;
            this.y_speed += (paddle2.y_speed / 2);
            this.x += this.x_speed;
        }
    }
};

document.body.appendChild(canvas);
animate(step);

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});
