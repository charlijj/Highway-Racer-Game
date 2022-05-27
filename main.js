window.addEventListener(`load`, function ()

 {

    const mainCVS = document.getElementById(`mainCanvas`);
    const ctx = mainCVS.getContext(`2d`);

    const startStopButton = document.getElementById(`startStopButton`);
    startStopButton.addEventListener(`click`, () => {startStop()})

    const pressStart = document.getElementById(`pressStart`);
    pressStart.style.opacity = `1`;
    pressStart.style.fontSize = `70px`;


    const menu = document.getElementById(`menu`);

    if (this.window.localStorage.getItem(`prevScore`) == null)
    {
        this.window.localStorage.setItem(`prevScore`, 0);
    }
    if (this.window.localStorage.getItem(`highScore`) == null)
    {
        this.window.localStorage.setItem(`highScore`, 0);
    }
    menu.innerHTML = `<div id="menuScore"><p id="yourScore">Your Score: &nbsp; ` + this.window.localStorage.getItem(`prevScore`) + `</p><p id="highScore">High Score: &nbsp; ` + this.window.localStorage.getItem(`highScore`) +`</p></div>`;

    mainCVS.width = 800;
    mainCVS.height= 720;

    // -------------------------------------------------------------------------------

    class InputHandler {

        constructor() {

            this.keys = [];

 
            window.addEventListener(`keydown`, event => {

                if (event.repeat)
                {
                    return;
                }

                // console.log(event.key)
                
                if (event.key === `w` ||

                event.key === `a` || 

                event.key === `s` ||

                event.key === `d` ||

                event.key === `ArrowRight` ||

                event.key === `ArrowLeft` ||

                event.key === `ArrowUp` ||

                event.key === `ArrowDown` 
                
                && this.keys.indexOf(event.key) === -1
                )
                {

                    /*
                    Code for diagonal movement.

                    if (document.getElementById(`toggleDiagonal`).value == "OFF")
                    {
                        if (this.keys.length == 0)
                        {
                            this.keys.push(event.key);
                        }
                    }
                    else
                    {
                        this.keys.push(event.key);
                    }
                    */

                    if (this.keys.length == 0)
                    {
                        this.keys.push(event.key);
                    }

                }

            })

            this.key = window.addEventListener(`keyup`, event => {

                if (event.key === `w` ||

                    event.key === `a` ||

                    event.key === `s` ||

                    event.key === `d` ||

                    event.key === `ArrowRight` ||

                    event.key === `ArrowLeft` ||
    
                    event.key === `ArrowUp` ||
    
                    event.key === `ArrowDown`
                )
                {
                    this.keys.splice(this.keys.indexOf(event.key), 1)
                }

            })
        }

        
    }

    class Player {

        constructor (gameWidth, gameHeight) {

            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 40;
            this.height = 150;
            this.x = 50;
            this.y = this.gameHeight - this.height;
            this.speed = 0;
            this.yVelocity = 0;

            // This variable is used to break out of the animation loop to prevent zombie processes. 
            this.die = false;

        }

        draw (context, enemy) {


            context.fillStyle = `pink`;
            context.strokeStyle = `white`;

            context.fillRect(this.x, this.y, this.width, this.height);

            if (((this.x > Math.round(enemy.carX) && this.x < Math.round(enemy.carX) + enemy.carWidth) || (this.x + this.width > Math.round(enemy.carX) && this.x + this.width < Math.round(enemy.carX) + enemy.carWidth))
                && (this.y > Math.round(enemy.carY) && this.y < Math.round(enemy.carY) + enemy.carHeight))
            {
                this.die = true;
                endGame(context);
            }

            else if (((this.x > Math.round(enemy.semiTruckX) && this.x < Math.round(enemy.semiTruckX) + enemy.semiTruckWidth) || (this.x + this.width > Math.round(enemy.semiTruckX) && this.x + this.width < Math.round(enemy.semiTruckX) + enemy.semiTruckWidth))
                    && (this.y > Math.round(enemy.semiTruckY) && this.y < Math.round(enemy.semiTruckY) + enemy.semiTruckHeight))
            {
                this.die = true;
                endGame(context);
            }

            else if (((this.x > Math.round(enemy.motorcycleX - 10) && this.x < Math.round(enemy.motorcycleX + 10) + enemy.motorcycleWidth) || (this.x + this.width > Math.round(enemy.motorcycleX - 10) && this.x + this.width < Math.round(enemy.motorcycleX + 10) + enemy.motorcycleWidth))
                    && (this.y > Math.round(enemy.motorcycleY) && this.y < Math.round(enemy.motorcycleY) + enemy.motorcycleHeight))
            {
                this.die = true;
                endGame(context);
            }
            
            else if (((this.x > Math.round(enemy.vanX) && this.x < Math.round(enemy.vanX) + enemy.vanWidth) || (this.x + this.width > Math.round(enemy.vanX) && this.x + this.width < Math.round(enemy.vanX) + enemy.vanWidth))
                    && (this.y > Math.round(enemy.vanY) && this.y < Math.round(enemy.vanY) + enemy.vanHeight))
            {
                this.die = true;
                endGame(context);
            }

            else if (this.x < 33 || this.x > this.gameWidth - 33 - this.width/2)
            {
                this.die = true;
                endGame(context);
            }

        }

        update (input) {


            if (input.keys.indexOf(`d`) > -1 || input.keys.indexOf(`ArrowRight`) > -1)
            {
                this.speed = 10;
            }
            else if (input.keys.indexOf(`a`) > -1 || input.keys.indexOf(`ArrowLeft`) > -1)
            {
                this.speed = -10;
            }
            else if (input.keys.indexOf(`w`) > -1 || input.keys.indexOf(`ArrowUp`) > -1)
            {
                this.yVelocity = -15;

            }
            else if (input.keys.indexOf(`s`) > -1 || input.keys.indexOf(`ArrowDown`) > -1)
            {
                this.yVelocity = 15;

            }
            else 
            {
                this.speed = 0;
                this.yVelocity = 0;

            }

            // X-axis
            this.x += this.speed;

            //Y-axis
            this.y += this.yVelocity;

            if (this.y < 0)
            {
                this.y = 0;
            }

            if (this.y > this.gameHeight - this.height)
            {
                this.y = this.gameHeight - this.height;
            }

        }

    }

    class Background {

        constructor (gameWidth, gameHeight)
        {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight;
            this.sidewalkWidth = 40;
            this.sidewalkBorderWidth = 3;
            this.roadY = 0;
            this.roadSpeed = 7;
            this.score = 0;

        }

        draw (context)
        {

            // Main Background
            context.fillStyle = `#4e4e4e`;
            context.fillRect(0, 0, this.gameWidth, this.gameHeight);

            // Left Sidewalk
            context.fillStyle = `#afafaf`;
            context.fillRect(0, 0, this.sidewalkWidth, this.gameHeight);
            context.fillStyle = `black`;
            context.fillRect(this.sidewalkWidth, 0, this.sidewalkBorderWidth, this.gameHeight);

            // Right Sidewalk
            context.fillStyle = `#afafaf`;
            context.fillRect(this.gameWidth - this.sidewalkWidth, 0, this.sidewalkWidth, this.gameHeight);
            context.fillStyle = `black`;
            context.fillRect(this.gameWidth - this.sidewalkWidth - this.sidewalkBorderWidth, 0, this.sidewalkBorderWidth, this.gameHeight);

            // Middle Lines
            context.fillStyle = `yellow`;    
            for (let i=0; i < this.gameHeight + 80; i+=80)
            {
                context.fillRect(this.gameWidth/2 - 5, this.gameHeight - this.roadY - i, 10, 50);
            }

            this.roadY+=this.roadSpeed;

            if (this.roadY > this.gameHeight / 10)
            {
                this.roadY = 0;
            }

            this.score += 1;
            document.getElementById(`scoreDisplay`).value = this.score;

        }

        


    }

    class Enemy {

        constructor (gameWidth, gameHeight)
        {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight;

            this.carWidth = 50;
            this.carHeight = 200;
            this.carX = 0;
            this.carY = -200;
            this.carSpeed = 5;
            
            this.motorcycleWidth = 20;
            this.motorcycleHeight = 100;
            this.motorcycleX = 0;
            this.motorcycleY = -100;
            this.motorcycleSpeed = 20;

            this.semiTruckWidth = 75;
            this.semiTruckHeight = 300;
            this.semiTruckX = 0;
            this.semiTruckY = -300;
            this.semiTruckSpeed = 7;

            this.vanWidth = 55;
            this.vanHeight = 250;
            this.vanX = 0;
            this.vanY = -250;
            this.vanSpeed = 10;

            this.spawnTimeout = true;

        }

        draw (context)
        {

            if (this.spawnTimeout)
            {
                this.carY -= 500;
                this.motorcycleY -= 1000;
                this.semiTruckY -= 500;
                this.vanY -= 500;
                this.spawnTimeout = false;
            }

            this.drawCar(context);
            this.drawMotorcycle(context);
            this.drawSemiTruck(context);
            this.drawVan(context);  

        }

        drawCar (context) {

            if (this.carX == 0)
            {
                this.carX = Math.random() * 1000;

                if (this.carX < 75)
                {
                    this.carX = 75;
                }
                else if (this.carX > this.gameWidth - 90)
                {
                    this.carX = this.gameWidth - 90;
                }
            }
            
            context.fillStyle = `black`;
            context.fillRect(this.carX, this.carY, this.carWidth, this.carHeight);

            this.carY += this.carSpeed;

            if (this.carY > this.gameHeight)
            {
                this.carY = -200;
                this.carX = 0
            }

        }

        drawMotorcycle (context) {

            if (this.motorcycleX == 0)
            {
                this.motorcycleX = Math.random() * 1000;

                if (this.motorcycleX < 60)
                {
                    this.motorcycleX = 60;
                }
                else if (this.motorcycleX > this.gameWidth - 70)
                {
                    this.motorcycleX = this.gameWidth - 70;
                }
            }
            
            context.fillStyle = `#ff4141`;
            context.fillRect(this.motorcycleX, this.motorcycleY, this.motorcycleWidth, this.motorcycleHeight);

            this.motorcycleY += this.motorcycleSpeed;

            if (this.motorcycleY > this.gameHeight)
            {
                this.motorcycleY = -100;
                this.motorcycleX = 0
            }

        }

        drawSemiTruck (context) {

            if (this.semiTruckX == 0)
            {
                this.semiTruckX = Math.random() * 1000;

                if (this.semiTruckX < 100)
                {
                    this.semiTruckX = 100;
                }
                else if (this.semiTruckX > this.gameWidth - 130)
                {
                    this.semiTruckX = this.gameWidth - 130;
                }
            }
            
            context.fillStyle = `#d0d0d0`;
            context.fillRect(this.semiTruckX, this.semiTruckY, this.semiTruckWidth, this.semiTruckHeight);


            this.semiTruckY += this.semiTruckSpeed;

            if (this.semiTruckY > this.gameHeight)
            {
                this.semiTruckY = -300;
                this.semiTruckX = 0
            }

        }

        drawVan (context) {

            if (this.vanX == 0)
            {
                this.vanX = Math.random() * 1000;

                if (this.vanX < 200)
                {
                    this.vanX = 200;
                }
                else if (this.vanX > this.gameWidth - 200)
                {
                    this.vanX = this.gameWidth - 200;
                }
            }
            
            context.fillStyle = `black`;
            context.fillRect(this.vanX, this.vanY, this.vanWidth, this.vanHeight);

            this.vanY += this.vanSpeed;

            if (this.vanY > this.gameHeight)
            {
                this.vanY = -300;
                this.vanX = 0
            }

        }

    }

    // -------------------------------------------------------------------------------

    function endGame () {

        let highScore = window.localStorage.getItem(`highScore`);
        let score = parseInt(document.getElementById(`scoreDisplay`).value);
        window.localStorage.setItem(`prevScore`, score);

        if (score > highScore)
        {
            highScore = score;
            window.localStorage.setItem(`highScore`, score)
        }

        startStop();

    }

    function startStop ()
    {
        const startStopButton = document.getElementById(`startStopButton`);
        
        if (startStopButton.value === `Stop`)
        {
            startStopButton.value = `Start`;
            startStopButton.style.backgroundColor = `rgb(200, 200, 200)`;
            deconstructGame ();
        }
        else
        {
            startStopButton.value = `Stop`;
            startStopButton.style.backgroundColor = `rgb(255, 70, 70)`;
            loadGame();
        }
    }

    function loadGame () {

        menu.style.opacity = `0`;
        pressStart.style.opacity = `0`;
        pressStart.style.fontSize = `70px`;

        const input = new InputHandler();
        const player = new Player(mainCVS.width, mainCVS.height);
        const enemy = new Enemy(mainCVS.width, mainCVS.height);
        const background = new Background(mainCVS.width, mainCVS.height);

        function animate () {
    
            ctx.clearRect(0, 0, mainCVS.width, mainCVS.height);
            background.draw(ctx);
            player.draw(ctx, enemy);
            player.update(input);
            enemy.draw(ctx, player);

            if (player.die)
            {
                cancelAnimationFrame(animate);
                return;
            }

            requestAnimationFrame(animate);
        }       
        animate();
    }

    function deconstructGame () {

        window.location.reload();
    }

    const background = new Background(mainCVS.width, mainCVS.height);
    background.draw(ctx);

});


/*
Code for diagonal movement.

document.getElementById(`toggleDiagonal`).addEventListener(`click`, function () {

    if (document.getElementById(`toggleDiagonal`).value != `ON`)
    {
        document.getElementById(`toggleDiagonal`).value = `ON`;  
    }
    else
    {
        document.getElementById(`toggleDiagonal`).value = `OFF`;  
    }
})
*/