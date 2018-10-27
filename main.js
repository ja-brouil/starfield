import Star from './star.js';

// Start the Canvas
const canvas = document.getElementById("starfield");
const graphics = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;
graphics.strokeStyle = "#FFFFFF";
graphics.fillStyle = "#FFFFFF";

// Star Field Settings
const starFieldSettings = {
    starNumber : 200,
    starArray : [],
    centerX : width / 2,
    centerY : height / 2,
    fl : width * 2,
    windowWidth : width,
    windowHeight : height,
    speed : 10
}

// Create Initial Stars
const createStars = () => {
    for (let i = 0; i < starFieldSettings.starNumber; i++) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);
        let z = Math.floor(Math.random() * width);
        starFieldSettings.starArray.push(new Star(x, y, z, graphics));
    }
}

// Star Movement
const animate = () => {
    // Update Loop
    requestAnimationFrame(animate);

    // Clear Canvas
    graphics.clearRect(0, 0, width, height);
    
    // Stars
    starFieldSettings.starArray.forEach((star) => {
        star.update(starFieldSettings);
    });
}

// Event Listeners
const starAmt = document.getElementById("starAmt");
const warpSpeed = document.getElementById("speed");
const startHyperSpace = document.getElementById("start");
startHyperSpace.addEventListener("submit", (event) => {
    event.preventDefault();

    // Clear Canvas
    graphics.clearRect(0, 0, width, height);

    // Create Stars
    starFieldSettings.starArray = [];
    if (parseInt(starAmt.value) > 0 || starAmt.value){
        if ((parseInt(starAmt.value) < 1000)){
            starFieldSettings.starNumber = parseInt(starAmt.value);
        }
    }
    createStars();

    // Set Speed
    if (parseInt(warpSpeed.value) > 0 || warpSpeed.value){
        if (parseInt(warpSpeed.value) < 50){
            starFieldSettings.speed = parseInt(warpSpeed.value);
        }
    }

    animate();
});