class Star {
    constructor(x, y, z, graphics){
        this.x = x;
        this.y = y;
        this.z = z;  
        this.radius = 1;
        this.graphics = graphics;
    }

    draw(starInfo) {
        this.graphics.beginPath();
        this.graphics.arc(starInfo.drawX, starInfo.drawY, starInfo.radius, 0, 2 * Math.PI);
        this.graphics.fill();
        this.graphics.closePath();
    }

    update(starFieldSettings){
        // Initial Position 3D space
        let starInfo = {
            drawX : 0,
            drawY : 0,
            radius: 0
        }
        
        // Movement calculations
        starInfo.drawX = (this.x - starFieldSettings.centerX) * (starFieldSettings.fl / this.z);
        starInfo.drawX = starInfo.drawX + starFieldSettings.centerX;

        starInfo.drawY = (this.y - starFieldSettings.centerY) * (starFieldSettings.fl / this.z);
        starInfo.drawY = starInfo.drawY + starFieldSettings.centerY;

        starInfo.radius = this.radius * (starFieldSettings.fl / this.z);

        // Move
        this.move(starFieldSettings, starInfo);

        // Render
        this.draw(starInfo);
    }

    move(starFieldSettings, starInfo) {
        this.z = this.z - starFieldSettings.speed;
        if (this.z <= 0 || starInfo.drawX < 0 || starInfo.drawX > starFieldSettings.windowWidth || starInfo.drawY < 0 || starInfo.drawY > starFieldSettings.windowHeight) {
            this.x = Math.floor(Math.random() * starFieldSettings.windowWidth);
            this.y = Math.floor(Math.random() * starFieldSettings.windowHeight);
            this.z = Math.floor(Math.random() * starFieldSettings.windowWidth);
        }
    }
}

export default Star;