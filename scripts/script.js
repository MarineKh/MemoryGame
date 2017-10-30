var resetButton = $('#reset-button');

var colors = [];
var gameSquares = [];

for(var i = 0; i < 10; ++i) {
    colors.push('square-' + i);
}

function GameSquare(el, color) {
    this.el = el;
    this.isOpen = false;
    this.isLocked = false;
    this.el.addEventListener("click", this, false);
    this.setColor(color);
}

GameSquare.prototype.handleEvent = function(e) {
    switch (e.type) {
        case "click":
            if (this.isOpen || this.isLocked) {
                return;
            }
            this.isOpen = true;
            this.el.classList.add('flip');
    }
};

GameSquare.prototype.reset = function() {
    this.isOpen = false;
    this.isLocked = false;
    this.el.classList.remove('flip');
};

GameSquare.prototype.lock = function() {
    this.isLocked = true;
    this.isOpen = true;
};

GameSquare.prototype.setColor = function(color) {
    this.el.children[0].children[1].classList.remove(this.color);
    this.color = color;
    this.el.children[0].children[1].classList.add(color);
    // console.log(this.el);
};

//Set up the Game
function setupGame() {
    var array = $('.game-square');
    var randomColors = getSomeColors();             // Get an array of 8 random color pairs
    for (var i = 0; i < array.length; i++) {
        var index = random(randomColors.length);      // Get a random index
        var color = randomColors.splice(index, 1)[0]; // Get the color at that index
        // Use that color to initialize the GameSquare
        gameSquares.push(new GameSquare(array[i], color));
    }
}
setupGame();
//test

//Assign random colors

function random(n) {
    return Math.floor(Math.random() * n);
}

function getSomeColors() {
    var colorscopy = colors.slice();
    var randomColors = [];
    for (var i = 0; i < 8; i++) {
        var index = random(colorscopy.length);
        randomColors.push(colorscopy.splice(index, 1)[0]);
    }
    return randomColors.concat(randomColors.slice());
}
//test

//Game logic

var firstSquare = null; //no square has been clicked.

function checkGame(gameSquare) {
    if (firstSquare === null) {
        firstSquare = gameSquare;
        return;
        // check if this is the first square clicked. If firstSquare is null it is,
    }

    if (firstSquare.color === gameSquare.color) {
        firstSquare.lock();
        gameSquare.lock();
    } else {
        var a = firstSquare;
        var b = gameSquare;
        //the references to firstSquare and gameSquare will be lost.
        // To preseve these they need to be assigned to a vars that are scoped to this function.
        setTimeout(function() {
            a.reset();
            b.reset();
            firstSquare = null;
        }, 400);
    }
    firstSquare = null;
}

GameSquare.prototype.handleEvent = function(e) {
    switch (e.type) {
        case "click":
            if (this.isOpen || this.isLocked) {
                return;
            }
            this.isOpen = true;
            this.el.classList.add('flip');
            checkGame(this); // <- check the game here!
    }
};
//test
function randomizeColors() {
    var randomColors = getSomeColors();
    gameSquares.forEach(function(gameSquare) {
        var color = randomColors.splice(random(randomColors.length), 1)[0];
        gameSquare.setColor(color);
    });
}

resetButton.click(function () {
    gameSquares.forEach(function(gameSquare) {
        gameSquare.reset(); //This should cause all of the squares to close.
    });
    setTimeout(function() {
        randomizeColors();
    }, 500);
});

//Using slice() to copy an array
// Using splice() to remove items from an array
