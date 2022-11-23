let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left=position.x+"px";
  newimg.style.top=position.y+"px";
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  //const xMin = game.style.left;
  const xMin = 0;
  //const xMax = game.style.left + game.style.width;
  const xMax = window.innerWidth;
  //const yMin = game.style.top;
  const yMin = 0;
  //const yMax = game.style.top + game.style.height;
  const yMax = window.innerHeight;
  const imgWidth = 100; 
  const imgHeight = 100;
  const x = item.position.x;
  const xVelocity = item.velocity.x;
  const y = item.position.y;
  const yVelocity = item.velocity.y;
  let xForward = xVelocity>0;
  let yForward = yVelocity>0;
  //Check x collision
  if (xForward){
    if (x+xVelocity+ imgWidth > xMax){
      item.velocity.x= -item.velocity.x;
     //  xforward=false;
      item.newimg.src = pacArray[1][0];
    } 
  }
  else {
    if (x+xVelocity < xMin){
      item.velocity.x= -item.velocity.x;
      //xforward=true;  
      item.newimg.src = pacArray[0][0];
    }
   }
   //Check y collision
    if (yForward){
    if (y+yVelocity+ imgHeight > yMax){
      item.velocity.y= -item.velocity.y;
      //yforward=false;
     // item.newimg.src = pacArray[1-xForward][1-yForward];
    } 
  }
  else {
    if (y+yVelocity < yMin){
      item.velocity.y= -item.velocity.y;
      //yforward=true;  
      //item.newimg.src = pacArray[1-xForward][1-yForward];
    }
   }
  }


function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
