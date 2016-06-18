/*
   This is the main script but I don't remember what it does.
   Drinking a beer right now
*/

/* Define global variables */
var combo = 1;
var punching = false; /* Is blossom currently punching? */
var kicking = false; /* Is blossom currently kicking? */
var flying = false;
var moving = false;
var right = true;
var left = false;
var attacking = false;
var dist = 0;
var fireball_speed = 500;
var laser_speed = 1000;

/* Set dimensions of the game screen */
function setdim(width,height){
    img_width=width;
    img_height=height;
}

/* Load Stage image */
var stage = document.createElement("IMG");
stage.setAttribute("src","images/stages/testStage.png");

/* Load Sprite Images */
var img = document.createElement("IMG");
img.setAttribute("src","images/blossom/neutral-right.gif");
var fire_img = document.createElement("IMG");
var fire_right = "images/blossom/fireball-1-right.gif";
var fire_left = "images/blossom/fireball-1-left.gif";
var laser_img = document.createElement("IMG");
var laser_src = "images/blossom/laser.gif";

/* Create projectiles from PROJECTILE class */
var fireball = new Projectile(0,0,fireball_speed,fire_img, false, fire_right, fire_left);
var laser = new Projectile(0,0,laser_speed,laser_img, false,laser_src,laser_src);


/* Handles sprite animation while Bubbles is running towards right direction */
function setRightRun(){
    //setdim(43,58);
    if(left){
            img.setAttribute("src","images/blossom/neutral-right.gif");
            dist=0;
            left= false;
            right= true;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/blossom/run-1-right.gif");
            } else if (dist === 2){
                img.setAttribute("src","images/blossom/run-2-right.gif");
            } else if (dist === 3){
                img.setAttribute("src","images/blossom/run-3-right.gif");
            } else if (dist === 4) {
                img.setAttribute("src","images/blossom/run-4-right.gif");
            }
            if(dist >= 4){
                dist= 0;
            }
        };
};

/* Handles sprite animation while Bubbles is running towards left direction */
function setLeftRun(){
    if(right){
            img.setAttribute("src","images/blossom/neutral-left.gif");
            dist=0;
            left= true;
            right= false;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/blossom/run-1-left.gif");
            } else if (dist == 2){
                img.setAttribute("src","images/blossom/run-2-left.gif");
            } else if (dist == 3){
                img.setAttribute("src","images/blossom/run-3-left.gif");
            } else if (dist == 4) {
                img.setAttribute("src","images/blossom/run-4-left.gif");
            };
            if(dist >= 4){
                dist= 0;
            }
        };
};

/*
 * Handles sprite animation while Bubbles is about to start flying
 * towards right direction.
*/
function setRightTakeOff(){
    //setdim(43,58);
    if(left){
            img.setAttribute("src","images/blossom/neutral-left.gif");
            dist=0;
            left= false;
            right= true;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/blossom/takeoff-1-right.gif");
                //setdim(43,58);
            } else if (dist === 2){
                img.setAttribute("src","images/blossom/takeoff-2-right.gif");
                //setdim(43,58);
            } else if (dist >= 3){
                img.setAttribute("src","images/blossom/fly-right.gif");
                //setdim(75,35);
            }
        };
};

/*
 * Handles sprite animation while Bubbles is about to start flying
 * towards left direction.
*/
function setLeftTakeOff(){
    //setdim(43,58);
    if(right){
            img.setAttribute("src","images/blossom/neutral-left.gif");
            dist=0;
            left= true;
            right= false;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/blossom/takeoff-1-left.gif");
                //setdim(43,58);
            } else if (dist === 2){
                img.setAttribute("src","images/blossom/takeoff-2-left.gif");
                //setdim(43,58);
            } else if (dist >= 3){
                img.setAttribute("src","images/blossom/fly-left.gif");
                //setdim(75,35);
            }
        };
};

/*
 * Handles sprite animation for when Bubbles is about to launch
 * a projectile
*/
function setProjectile(projectile){
    attacking=true;
    if(right){
        dist+=1;
        if(dist===1){
            img.setAttribute("src","images/blossom/attack-1-right.gif");
        } else if (dist===2){
            img.setAttribute("src","images/blossom/attack-2-right.gif");
        } else if (dist===3){
            img.setAttribute("src","images/blossom/attack-3-right.gif");
        } else if (dist===4){
            img.setAttribute("src","images/blossom/attack-4-right.gif");
        } else if (dist===5){
            img.setAttribute("src","images/blossom/attack-5-right.gif");
        } else if (dist===6){
            player.vx -= 60;
            projectile.exists =true;
            projectile.setPosition(player.x+img.width*(.8),player.y+8);
            projectile.setRight();
            projectile.setImage("images/blossom/fireball-1-right.gif");
        }
    } else {
        dist+=1;
        if(dist===1){
            img.setAttribute("src","images/blossom/attack-1-left.gif");
            //setdim(45,56);
        } else if (dist===2){
            img.setAttribute("src","images/blossom/attack-2-left.gif");
            //setdim(36,59);
        } else if (dist===3){
            img.setAttribute("src","images/blossom/attack-3-left.gif");
            //setdim(56,59);
        } else if (dist===4){
            img.setAttribute("src","images/blossom/attack-4-left.gif");
        } else if (dist===5){
            img.setAttribute("src","images/blossom/attack-5-left.gif");
            //setdim(53,60);
        } else if (dist===6){
            projectile.exists=true;
            player.vx += 60;
            projectile.setPosition(player.x-img.width*(.8),player.y+8);
            projectile.setLeft();
            projectile.setImage("images/blossom/fireball-1-left.gif");
        }
    }
};

/* Logs keys which have been pressed by user */
var keys = []; // Or you could call it "key"

/*
 * Handler for key press event
 * onkeydown: Key is pressed
 * onkeyup: Key is released
*/
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keys[e.keyCode] = e.type == 'keydown';
    
    /* Left and Up Key pressed */
    if(keys[37] && keys[38] && !attacking){
        player.vx += -20;
        player.vy += -20;
        player.ax += -5;
        if(!flying){
            setLeftTakeOff();
        } else {
            img.setAttribute("src","images/blossom/fly-left.gif");
            //setdim(75,35);
        };
        
        moving = true;
        
    /* Left and Down Key pressed */
    } else if (keys[37] && keys[40] && !attacking){
        player.vx += -20;
        player.vy += 20
        img.setAttribute("src","images/blossom/neutral-left.gif");
        //setdim(43,58);
        moving = true;
    
    /* Right and Up Key Pressed */
    } else if (keys[39] && keys[38] && !attacking){
        player.vx += 20;
        player.vy += -20;
        player.ax += 5;
        if(!flying){
            setRightTakeOff();
        } else {
            img.setAttribute("src","images/blossom/fly-right.gif");
            //setdim(75,35);
        };
        moving = true;
        
    /* Right and Down Key pressed */
    } else if (keys[39] && keys[40] && !attacking){
        player.vx += 20;
        player.vy += 20;
        img.setAttribute("src","images/blossom/neutral-right.gif");
        //setdim(43,58);
        moving = true;
        
    /* Left Key Pressed */
    } else if (keys[37] && !attacking){
        player.vx += -20;
        if(!flying){
            setLeftRun();
        } else {
            right = false;
            left = true;
            img.setAttribute("src","images/blossom/fly-neutral-left.gif");
            //setdim(46,75);
        }
        moving = true;
        
    /* Up Key Pressed */
    } else if (keys[38] && !attacking){
        if(right){
            img.setAttribute("src","images/blossom/fly-neutral-right.gif");
            //setdim(46,75);
        } else {
            img.setAttribute("src","images/blossom/fly-neutral-left.gif");
            //setdim(46,75);
        };
        moving = true;
        
    /* Right Key Pressed */
    } else if (keys[39] && !attacking){
        player.vx += 20;
        if(!flying){
            setRightRun();
        } else {
            right = true;
            left = false;
            img.setAttribute("src","images/blossom/fly-neutral-right.gif");
            //setdim(46,75);
        }
        moving = true;
        
    /* Down Key Pressed */
    } else if (keys[40]){
        player.vy += 20
        moving=false;
        if(!flying){
            /* When not in air and laser attack is initiated */
            if (keys[87]) {
                if(!attacking){
                    attacking = true;
                    combo=1;
                }
                if(right){
                    if(combo <= 3){
                        img.setAttribute("src","images/blossom/crouch-right.gif");
                        combo += 1;
                    } else if (combo === 4) {
                        laser.exists=true;
                        laser.setPosition(player.x+img.width*(.7),player.y+20);
                        laser.setRight();
                        laser.setImage("images/blossom/laser.gif");
                        combo += 1;
                    };
                } else {
                    if(combo <= 3){
                        img.setAttribute("src","images/blossom/crouch-left.gif");
                        combo +=1;
                    } else if (combo === 4) {
                        laser.exists=true;
                        laser.setPosition(player.x-img.width*(.9),player.y+20);
                        laser.setLeft();
                        laser.setImage("images/blossom/laser.gif");
                        combo += 1;
                    };
                };
            } else {
                if(right){
                    img.setAttribute("src","images/blossom/crouch-right.gif");
                } else {
                    img.setAttribute("src","images/blossom/crouch-left.gif");
                };
            }
        } else {
            moving = true;
        };
        
    /* When Plasma Ball projectile is initiated */
    } else if (keys[68]){
        //laser.exists = false;
        if(!attacking){
            dist=0;
        };
        setProjectile(fireball);
        
    /* When Punch Attack is initiated */
    } else if (keys[65]){
        if(kicking){
            punching = true;
            kicking = false;
            player.handtohand = true;
            combo=1;
        } else {
            punching = true;
            player.handtohand = true;
        }
        if(right){
            if( combo<=2 ){
                img.setAttribute("src","images/blossom/punch-1-right.gif");
                //setdim(43,60);
                player.vx += 5;
                combo +=1;
            } else if (combo<=4){
                img.setAttribute("src","images/blossom/punch-2-right.gif");
                //setdim(55,60);
                player.vx += 5;
                combo +=1;
            } else if (combo<=6){
                img.setAttribute("src","images/blossom/punch-3-right.gif");
                //setdim(52,61);
                player.vx += 5;
                combo +=1;
            } else if (combo<=8){
                img.setAttribute("src","images/blossom/punch-4-right.gif");
                //setdim(59,60);
                player.vx += 5;
                combo +=1;
            } else if (combo<=10){
                img.setAttribute("src","images/blossom/punch-5-right.gif");
                //setdim(42,63);
                player.vx += 5;
                combo +=1;
            } else if (combo<=14){
                img.setAttribute("src","images/blossom/punch-6-right.gif");
                //setdim(56,61);
                player.vx += 5;
                combo=1;
            }
        } else {
            if( combo <= 2 ){
                img.setAttribute("src","images/blossom/punch-1-left.gif");
                //setdim(43,60);
                player.vx -= 5;
                combo +=1;
            } else if (combo <= 4){
                img.setAttribute("src","images/blossom/punch-2-left.gif");
                //setdim(55,60);
                player.vx -= 5;
                combo +=1;
            } else if (combo <= 6){
                img.setAttribute("src","images/blossom/punch-3-left.gif");
                //setdim(52,61);
                player.vx -= 5;
                combo +=1;
            } else if (combo <= 8){
                img.setAttribute("src","images/blossom/punch-4-left.gif");
                //setdim(59,60);
                player.vx -= 5;
                combo +=1;
            } else if (combo <= 10){
                img.setAttribute("src","images/blossom/punch-5-left.gif");
                //setdim(42,63);
                player.vx -= 5;
                combo +=1;
            } else if (combo <= 14){
                img.setAttribute("src","images/blossom/punch-6-left.gif");
                //setdim(56,61);
                player.vx -= 5;
                combo=1;
            }
        };
        
    /* When Kick Attack is initiated */
    } else if(keys[83]) {
        if(punching){
            kicking = true;
            punching = false;
            combo=1;
            player.handtohand = true;
        } else {
            kicking = true;
            player.handtohand = true;
        }
        if(right){
            if(combo <= 1){
                img.setAttribute("src","images/blossom/brace-right.gif");
                //setdim(49,60);
                combo += 1;
            } else if (combo <= 2){
                img.setAttribute("src","images/blossom/kick-1-right.gif");
                //setdim(52,54);
                if(!flying){
                    player.vx += 15;
                    player.vy -= 80;
                }
                combo+=1;
            } else if (combo <= 10){
                img.setAttribute("src","images/blossom/kick-2-right.gif");
                //setdim(85,52);
                if(!flying){
                    player.vx += 20;
                    //player.vy -= 15;
                }
                combo+=1;
            }
        } else {
            if(combo <= 1){
                img.setAttribute("src","images/blossom/brace-left.gif");
                //setdim(49,60);
                combo += 1;
            } else if (combo <= 2){
                img.setAttribute("src","images/blossom/kick-1-left.gif");
                //setdim(52,54);
                if(!flying){
                    player.vx += 15;
                    player.vy -= 80;
                }
                combo+=1;
            } else if (combo <= 10){
                if(!flying){
                    player.vx -= 20;
                    //player.vy -= 15;
                }
                img.setAttribute("src","images/blossom/kick-2-left.gif");
                //setdim(85,52);
            }
        }
    
    /* Laser Beam projectile is initiated */
    } else if (keys[87]){
        if(!attacking){
            attacking = true;
            combo=1;
        }
        if(right){
            if(combo <= 3){
                img.setAttribute("src","images/blossom/brace-right.gif");
                //setdim(49,60);
                combo += 1;
            } else if (combo === 4) {
                laser.exists=true;
                laser.setPosition(player.x+img.width*(.7),player.y+15);
                laser.setRight();
                laser.setImage("images/blossom/laser.gif");
                combo += 1;
            };
        } else {
            if(combo <= 3){
                img.setAttribute("src","images/blossom/brace-left.gif");
                //setdim(49,60);
                combo +=1;
            } else if (combo === 4) {
                laser.exists=true;
                laser.setPosition(player.x-img.width*(.9),player.y+15);
                laser.setLeft();
                laser.setImage("images/blossom/laser.gif");
                combo += 1;
            }
        };
    } else {
        moving = false;
        attacking = false;
        player.handtohand = false;
        player.ax = 0;
        combo=1;
        if(flying){
            if(right && player.vy >= 0){
                img.setAttribute("src","images/blossom/falling-right.gif");
                //setdim(43,59);
            } else if(right && player.vy < 0){
                img.setAttribute("src","images/blossom/fly-neutral-right.gif");
                //setdim(46,75);
            } else if(left && player.vy >= 0){
                img.setAttribute("src","images/blossom/falling-left.gif");
                //setdim(43,59);
            } else if(left && player.vy < 0){
                img.setAttribute("src","images/blossom/fly-neutral-left.gif");
                //setdim(46,75);
            }
        } else {
            if(right){
                img.setAttribute("src","images/blossom/neutral-right.gif");
                //setdim(43,58);
            } else {
                img.setAttribute("src","images/blossom/neutral-left.gif");
                //setdim(43,58);
            };
        };
    };  
};


/* Build the Game Setting */

// Get the canvas element
var canvas = document.getElementById( "canvas" );
// Get our 2D context for drawing
var ctx = canvas.getContext( "2d" );
// Frames-per-second
var FPS = 150;

// player object
var player = {
    x: canvas.width/4,
    y: canvas.height - 65,
    handtohand: false,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 150,
    health: 100,
    draw: function() {
        ctx.drawImage(img,this.x,this.y);
    },
    manage: function(proj){
        var xtouching = (Math.abs(proj.x - this.x) <= 20);
        var y1 = (proj.y > this.y) && (proj.y < (this.y+img.height));
        var y2 = (proj.y + img.height) > this.y;
        var ytouching =  y1 || y2;
      
        if(xtouching && ytouching){
            this.health -= .5;
            if(this.health <=0){
                this.health = 0;
            };
        };
    },
    
    update: function() {
        
        if(!attacking){
            this.vx += this.ax / FPS;
            this.vy += this.ay / FPS;
            this.x += this.vx / FPS;
            this.y += this.vy / FPS;
        };
        
        this.manage(fireball);
        this.manage(laser);
        this.manage(protoman.getPlasmaBall());
        
        if(this.y < (canvas.height - 65 - img.height*1.5)){
            flying = true;
        } else {
            flying = false;
        };
        
        
        // Collision detection
        if ( this.x  < -100) {
            this.x = canvas.width;
            this.vx = this.vx/2;
        };
        if ( this.x > canvas.width) {
            this.x = -img.width;
            this.vx = this.vx/2;
        };
        if ( this.y <= 0 ) {
            this.y = 0;
            this.vy = 0;
        };
        if ( this.y > (canvas.height - 65) - img.height ) {
            this.y = canvas.height - 65 - img.height;
            this.vy = -this.vy/6;
            this.vx = this.vx/1.01;
        };
    }
};

/* Draws the elements of the game */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(stage,0,0,canvas.width,canvas.height);
    player.draw();
   if(fireball.exists){
        fireball.draw();
    };
    if(laser.exists){
        laser.draw();
    };
    if(protoman.getPlasmaBall().exists){
        protoman.getPlasmaBall().draw();
    };
    
    protoman.draw();
};

/* Updates the positions and statuses of all game entities */
function update() {
    player.update();
    if(fireball.exists){
        fireball.update();
    };
    if(laser.exists){
        laser.update();
    };
    if(protoman.getPlasmaBall().exists){
        protoman.getPlasmaBall().update();
    };
    
    protoman.update();
    health.update();
}

/* Progresses the game using the draw and update function */
function tick() {
    if(player.health > 0 && protoman.character.health > 0){
        draw();
        update();
    } else {
        ctx.fillStyle="white";
        ctx.fillRect(canvas.width*.2,canvas.height*.2,canvas.width*.6,canvas.height*.6);
        ctx.font="50px Georgia";
        ctx.fillStyle="black";
        ctx.fillText("GAME OVER",canvas.width*.3,canvas.height*.4);
    }
}

/* Begins the game, animating all actions */
setInterval( tick, 1000 / FPS );