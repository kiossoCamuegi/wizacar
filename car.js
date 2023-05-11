
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector(".gameArea");
const restart = document.querySelector(".restart");
let finalScore = 0;

startScreen.addEventListener('click', startGame);
restart.addEventListener('click', startGame);
document.addEventListener('keydown' , pressOn);
document.addEventListener('keyup', pressOff);

let player ={speed:5,score:0}
let keys  = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false,
}

 

function startGame(){
       
    var audio = new Audio('./road.mp3');
    audio.play();
    start()  
    document.querySelector(".car").style.backgroundImage = `url('./truck.png')`;
    restart.classList.remove("show");
}


function start(){
    startScreen.classList.add('hide');
    gameArea.classList.remove('hide');
    score.style.display = "flex"; 

    gameArea.innerHTML = "";
    player.start =true;
    player.score = 0;

 for(let x = 0; x < 5; x++){
      let div = document.createElement("div");
      div.classList.add("line");
      div.y = x*300  
      div.style.top = (x*300)+"px";
      gameArea.appendChild(div);
 }


    window.requestAnimationFrame(playGame);

    let car = document.createElement("div");
   // car.innerHTML = "Me"
    car.classList.add('car'); //or car.setAttribute("class","car")
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    console.log(player);



    for(let x = 0; x < 4; x++) {
       let enemy = document.createElement("div"); 
       enemy.classList.add("enemy"); 
       enemy.y = ((x+1)*600)*-1;
       enemy.style.top = enemy.y +"px";
       enemy.style.left = Math.floor(Math.random()*500) +"px";
       
       //enemy.innerHTML = (x+1);
       enemy.style.backgroundImage = `url('${randomColor()}')`;
       gameArea.appendChild(enemy);   
    }
}



 
function playGame(){
    let car = document.querySelector('.car');
    car.style.backgroundImage = `url('./truck.png')`;
    moveLines();
    moveEnemy(car);
    let road = gameArea.getBoundingClientRect(); 
    console.table(road); 
    if(player.start){

       if(keys.ArrowUp && player.y > road.top){
           player.y -= player.speed;
        }
       if(keys.ArrowDown && player.y < road.bottom){
           player.y  += player.speed;
        }
       if(keys.ArrowLeft && player.x > 0){
           player.x  -= player.speed;
        }
       if(keys.ArrowRight && player.x < (road.width - 60)){
           player.x += player.speed;
        }
       car.style.left = player.x+'px';
       car.style.top  = player.y+'px';
            
       window.requestAnimationFrame(playGame); 
        player.score++;
      
        finalScore = Math.floor(player.score) /100; 
        score.innerHTML =   ` <img src='./coin.png' />  Score :  ${finalScore}`;

       
    }
}


function moveLines(){
     let lines = document.querySelectorAll(".line");
     lines.forEach(item => {
         console.log(item.y);
         if(item.y >= 1000){
           item.y -= 1000;  
         }
         item.y += player.speed;
         item.style.top = item.y + "px";
     });
}

function moveEnemy(car){
    console.log(car);
    let ele = document.querySelectorAll(".enemy");
    ele.forEach(function(item){
        if(isCollide(car,item)){
            endGame();  
         }
  
  
          if(item.y >= 950){
            item.y = -600;  
            item.style.left = Math.floor(Math.random()*500) +"px";
          }
          item.y += player.speed * 2;
          item.style.top = item.y + "px";
    });  
}

function isCollide(a,b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
          (aRect.bottom < bRect.top) ||
          (aRect.top > bRect.bottom) ||
          (aRect.right < bRect.left) ||
          (aRect.left > bRect.right)
    )
}


function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerText ="Restart Game";
    restart.classList.add("show");
    var audio = new Audio('crash.mp3');
    audio.play(); 
    document.querySelector(".car").style.width = "150px";
    document.querySelector(".car").style.backgroundImage = "url('./explosion.gif')";
    setInterval(() => {
        document.querySelector(".car").style.backgroundImage = "";
        document.querySelector(".car").style.width = "60px";
    }, 1200);

    score.innerHTML =  ` <div>Game Over <br/></div> <img src='./coin.png' />  Score  :  ${player.score/100}`; 
}



function randomColor(){
   const Images = [
         "./Cars/1.png", 
         "./Cars/2.png", 
         "./Cars/3.png", 
         "./Cars/4.png", 
         "./Cars/5.png",
         "./Cars/6.png",  
   ]
   return Images[Math.floor(Math.random() * Images.length)] ;
}

function pressOn(e){
    e.preventDefault();
    keys[e.key] = true;
  //  console.log(keys)
    //console.log(e.key)
}


function pressOff(e){
    e.preventDefault();
    keys[e.key] = false;
   // console.log(keys)
    //console.log(e.key);
}


setInterval(() => {
    if (finalScore >= 15){
         player.speed = 7;
    } else if(finalScore >= 20){
        player.speed = 9;
    }else if(finalScore >= 25){
        player.speed = 11;
    }else if(finalScore >= 30){
        player.speed = 14;
    }else if(finalScore >= 35){
        player.speed = 15;
    }
}, 1000);




