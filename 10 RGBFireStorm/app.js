// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS RELATED TO CANVAS X AND Y

// Sets canvas width 10 less than window width. Complete canvas lies inside windows
function maxify(cutBy = 5.5) {
  canvas.width = window.innerWidth - cutBy;
  canvas.height = window.innerHeight - cutBy;
}

// Returns x co-ordinate of canvas center
function middleX() {
  return canvas.width / 2;
}

// Returns y co-ordinate of canvas center
function middleY() {
  return canvas.height / 2;
}

// Returns x co-ordinate at end
function endX() {
  return canvas.width;
}

// Returns y co-ordinate at end
function endY() {
  return canvas.height;
}

// Fills entire canvas with
function fillCanvas(color = "white") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}

// Clears entire canvas
function clearCanvas() {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}

// Draws horizontal axis
function drawHorizontal(color = "grey") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(0, middleY());
  ctx.lineTo(endX(), middleY());
  ctx.stroke();
  ctx.closePath();
}

// Draws verticle axis
function drawVerticle(color = "grey") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  drawAxes;
  ctx.moveTo(middleX(), 0);
  ctx.lineTo(middleX(), endY());
  ctx.stroke();
  ctx.closePath();
}

function drawAxes(color = "grey") {
  drawHorizontal(color);
  drawVerticle(color);
}

// Acceptable X coordinate for circle of given radius
function getAcceptableX(radius) {
  radius += 1;
  return randRange(radius, endX() - radius);
}

// Acceptable Y coordinate for circle of given radius
function getAcceptableY(radius) {
  radius += 1;
  return randRange(radius, endY() - radius);
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS RELATED TO RANDOM

// Random rational number from min to max not including max
function randRange(min, max) {
  return min + Math.random() * (max - min);
}

// Random integer from min to max, not including max
function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

// Return random element of array
function randItem(arr) {
  return arr[randInt(0, arr.length)];
}

function randomSign() {
  return Math.random() < 0.5 ? -1 : 1;
}

// Returns random color
function randomColor(opacity = 1) {
  return `rgba(${randRange(0, 256)},${randRange(0, 256)},${randRange(
    0,
    256
  )},${opacity})`;
}

function positive(number) {
  return Math.abs(number);
}

function negative(number) {
  return -Math.abs(number);
}

function absDiff(x1, x2) {
  return Math.abs(x1 - x2);
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS RELATED TO DISTANCE AND COORDINATE GEOMETRY

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function isPointInsideCircle(x1, y1, x2, y2, r2) {
  return getDistance(x1, y1, x2, y2) <= r2;
}

function isPointInsideSquare(x1, y1, x2, y2, size2) {
  return !(x1 < x2 || x1 > x2 + size2 || y1 < y2 || y1 > y2 + size2);
}

function isPointInsideRectangle(x1, y1, x2, y2, length2, breadth2) {
  return !(x1 < x2 || x1 > x2 + length2 || y1 < y2 || y1 > y2 + breadth2);
}

function getDegreeFromRadian(rad) {
  return (rad * 180) / Math.PI;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS RELATED TO DISTANCE AND COORDINATE GEOMETRY

function updateArray(arr) {
  arr.forEach((object) => {
    object.update();
  });
}

function updateObject(obj) {
  for (const objt in Object.values(obj)) {
    objt.update();
  }
}

function arrayOfObjects(n, clas) {
  let i, arr;
  arr = [];

  for (i = 0; i < n; i++) {
    arr.push(new clas());
  }

  return arr;
}

function newX(x, y, r, theta = 0) {
  return x + r * Math.cos(theta);
}

function newY(x, y, r, theta = 0) {
  return y - r * Math.sin(theta);
}

function drawLineSegment(x1, y1, x2, y2, color, lineWidth) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// COMPLEX FUNCTIONS

// Cooridnates that fill up entire canvas
function giveCoordinatesArray(size, gap) {
  let x, y, offset, arr;
  x = 0;
  y = 0;
  offset = size + gap;
  arr = [];

  for (let i = 0; y < endY(); i++) {
    y = i * offset;
    for (let j = 0; x < endX(); j++) {
      x = j * offset;
      arr.push([x, y]);
    }
    x = 0;
  }

  return arr;
}

// getQuadrant of x2,y2 with x1, y1 as origin
// Use canvas coordinate system
function getQuadrant(x1, y1, x2, y2) {
  if (x2 >= x1 && y2 <= y1) return 1;
  else if (x2 <= x1 && y2 < y1) return 2;
  else if (x2 < x1 && y2 >= y1) return 3;
  else if (x2 >= x1 && y2 > y1) return 4;
}

// Give actual theta with respect to quadrant
// Assuming angle to be radian
// Giving angle between 0 to 2 PI
function getActualTheta(theta, quadrant) {
  if (quadrant === 1) return theta;
  else if (quadrant === 2) return Math.PI - theta;
  else if (quadrant === 3) return Math.PI + theta;
  else if (quadrant === 4) return 2 * Math.PI - theta;
}

// GET ANGLE FROM 0 TO 2*PI IN RADIANS
// ASSUME X1,Y1 AS ORIGIN

function getAngle(x1, y1, x2, y2) {
  let opp, adj, theta, quadrant;
  opp = Math.abs(y2 - y1);
  adj = Math.abs(x2 - x1);
  theta = Math.atan2(opp, adj);
  quadrant = getQuadrant(x1, y1, x2, y2);
  return getActualTheta(theta, quadrant);
}

function getAngleInDegrees(x1, y1, x2, y2) {
  return getDegreeFromRadian(getAngle(x1, y1, x2, y2));
}

function hypot(x, y) {
  return Math.sqrt(x * x, y * y);
}

function doesCircleSquareIntersect(cX, cY, cR, x2, y2, size2) {
  return !(
    cX + cR < x2 ||
    cX - cR > x2 + size2 ||
    cY + cR < y2 ||
    cY - cR > y2 + size2 ||
    getDistance(cX, cY, x2 + size2 / 2, y2 + size2 / 2) >
      cR + hypot(size2, size2) / 2
  );
}

function doesCircleRectangleIntersect(cX, cY, cR, x2, y2, length2, breadth2) {
  return !(
    cX + cR < x2 ||
    cX - cR > x2 + length2 ||
    cY + cR < y2 ||
    cY - cR > y2 + breadth2 ||
    getDistance(cX, cY, x2 + length2 / 2, y2 + breadth2 / 2) >
      cR + hypot(length2, breadth2) / 2
  );
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// COMPLEX FUNCTIONS

function drawCircle(
  x = middleX(),
  y = middleY(),
  r = 10,
  lineColor = "black",
  lineWidth = 1
) {
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawBall(
  x = middleX(),
  y = middleY(),
  r = 10,
  lineWidth = 1,
  fillColor = "black",
  lineColor = "black"
) {
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = lineWidth;
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawRectangle(
  x = middleX(),
  y = middleY(),
  length = 10,
  breadth = 20,
  lineColor = "black",
  lineWidth = 1
) {
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(x, y, length, breadth);
  ctx.stroke();
  ctx.closePath();
}

function fillRectangle(
  x = middleX(),
  y = middleY(),
  length = 10,
  breadth = 20,
  fillColor = "black",
  lineColor = fillColor,
  lineWidth = 1
) {
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.fillStyle = fillColor;
  ctx.strokeRect(x, y, length, breadth);
  ctx.fillRect(x, y, length, breadth);
  ctx.stroke();
  ctx.closePath();
}

function moveTo(x, targetX, step) {
  if (x > targetX) {
    return Math.max(x - step, targetX);
  } else if (x < targetX) {
    return Math.min(x + step, targetX);
  } else {
    return targetX;
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
let mouse = { x: -200, y: -200 };
let temp;
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CLASS
class FireBall {
  constructor(
    x1 = endX(),
    y1 = endY(),
    x2 = 0,
    y2 = 0,
    radius = 10,
    color = "white",
    speedFactor = 5
  ) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.radius = radius;
    this.color = color;

    this.speedFactor = speedFactor;
    this.getDxDy();
  }

  updateXY() {
    this.x1 += this.dx;
    this.y1 += this.dy;
  }

  getDxDy() {
    let theta = getAngle(this.x1, this.y1, this.x2, this.y2);
    this.dx = this.speedFactor * Math.cos(theta);
    this.dy = this.speedFactor * -Math.sin(theta);
  }

  update() {
    this.updateXY();
    this.draw();
  }
  draw() {
    drawBall(this.x1, this.y1, this.radius, 1, this.color, this.color);
  }
}

class SquareCanon {
  constructor(
    x = middleX() - 50,
    y = middleY() - 50,
    size = 100,
    color = "white",
    x2 = 0,
    y2 = 0,
    radius = 10,
    speedFactor = 5,
    interval = 50
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;

    this.centreX = this.x + this.size / 2;
    this.centreY = this.y + this.size / 2;

    this.x2 = x2;
    this.y2 = y2;
    this.radius = radius;
    this.speedFactor = speedFactor;
    this.interval = interval;
    this.index = 0;

    this.ballArray = [];
  }

  createBall() {
    this.ballArray.push(
      new FireBall(
        this.centreX,
        this.centreY,
        mouse.x,
        mouse.y,
        10,
        this.color,
        this.speedFactor
      )
    );
  }

  updateBalls() {
    for (let ball of this.ballArray) {
      ball.update();
    }
  }

  changeColor(object) {
    object.color = randomColor();
  }

  runFunction(f = this.changeColor) {
    if (this.isMouseOnSquare()) {
      this.index++;
      if (this.index % this.interval === 0) {
        this.index = 0;
        f(this);
      }
    }
  }

  isMouseOnSquare() {
    return isPointInsideSquare(mouse.x, mouse.y, this.x, this.y, this.size);
  }

  update() {
    this.runFunction();
    this.draw();
  }
  draw() {
    fillRectangle(
      this.x,
      this.y,
      this.size,
      this.size,
      this.color,
      this.color,
      1
    );
  }
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// EVENT LISTENERS
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("resize", function () {
  maxify();
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CLASSES

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ANIMATE
temp = new SquareCanon();
function animate() {
  requestAnimationFrame(animate);
  fillCanvas("rgb(0, 0, 0, 0.5)");

  temp.update();
}
animate();
