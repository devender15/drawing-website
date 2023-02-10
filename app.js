let canvas = document.getElementById("canvas");
let canvasContainer = document.getElementById("canvasContainer");

canvas.height = 700;
canvas.width = 1200;

let ctx = canvas.getContext("2d");
lineWidth = 2;

// fill the bg white
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let prevX = null;
let prevY = null;

let draw = false;

let paint_erase = "paint";
let strokeStyle = "";

let pencils = document.querySelectorAll(".pencil-color");
let crayons = document.querySelectorAll(".crayon-color");
let brushs = document.querySelectorAll(".paint-brush");

pencils = Array.from(pencils);
crayons = Array.from(crayons);
brushs = Array.from(brushs);

// this will store the selected tool and whenever we select other tool then this tool will move to its original place
let selected = [];
let brushSelected = [];

pencils.forEach((clr) => {
  clr.addEventListener("click", () => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    lineWidth = 2;

    // checking if the pencil selected is a rainbow pencil
    checkRainbow(clr);

    selected.push(clr);
    if (selected.includes(clr)) {
      selected.forEach((clr) => {
        clr.classList.remove("move-tool");
      });
    }
    clr.classList.add("move-tool");

    // changing the cursor style
    canvas.style.cursor = `url(./assets/pencils/${clr.name}), auto`;
  });
});

crayons.forEach((clr) => {
  clr.addEventListener("click", () => {
    // ctx.lineJoin = "round";
    lineWidth = 5;

    // checking if the crayon selected is a rainbow crayon
    checkRainbow(clr);

    selected.push(clr);
    if (selected.includes(clr)) {
      selected.forEach((clr) => {
        clr.classList.remove("move-tool");
      });
    }
    clr.classList.add("move-tool");

    // changing the cursor style
    canvas.style.cursor = `url(./assets/crayons/${clr.name}), auto`;
  });
});

brushs.forEach((clr) => {
  clr.addEventListener("click", () => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    lineWidth = 25;

    // checking if the brush selected is a rainbow brush
    checkRainbow(clr);

    brushSelected.push(clr);
    if (brushSelected.includes(clr)) {
      brushSelected.forEach((clr) => {
        clr.classList.remove("brush-move");
      });
    }
    clr.classList.add("brush-move");

    // changing the cursor style
    canvas.style.cursor = `url(./assets/brush/${clr.name}), auto`;
  });
});

// nav buttons

let homeBtn = document.querySelector(".home");
homeBtn.addEventListener("click", () => {
  window.location.reload();
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // fill the bg white
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("imag/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "sketch.png";
  a.click();
});

const slider = document.querySelector("#slide");
slider.addEventListener("input", () => {
  console.log("slider value: ", slider.value);
  lineWidth = slider.value;
});

window.addEventListener("mousedown", (e) => (draw = true));
window.addEventListener("mouseup", (e) => (draw = false));

window.addEventListener("mousemove", function (e) {
  if (prevX == null || prevY == null || !draw) {
    prevX = e.clientX;
    prevY = e.clientY;
    return;
  }

  let mouseX = e.clientX;
  let mouseY = e.clientY;

  if (paint_erase == "erase") {
    ctx.strokeStyle = "white";
  } else {
    ctx.strokeStyle = strokeStyle;
  }
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();

  prevX = e.clientX;
  prevY = e.clientY;
});

// selecting buttons
let buttonsContainer = document.querySelector(".buttons");
let pencilBtn = document.querySelector("#pencil-btn");
let crayonBtn = document.querySelector("#crayon-btn");
let paintBtn = document.querySelector("#paint-btn");
let eraserBtn = document.querySelector("#eraser-btn");

let styles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
  margin: "1rem 0",
  height: "100%",
  animation: "animate 0.5s ease-out",
};

window.onload = () => {
  pencilBtn.classList.toggle("color-btn");

  // changing css for crayons
  resetCSS("pencil");
};

pencilBtn.addEventListener("click", () => {
  pencilBtn.classList.toggle("color-btn");

  // removing selection from other buttons
  crayonBtn.classList.remove("color-btn");
  paintBtn.classList.remove("color-btn");
  eraserBtn.classList.remove("color-btn");

  paint_erase = "paint";
  canvas.style.cursor = "default";

  // changing css for pencils
  resetCSS("pencil");
});

crayonBtn.addEventListener("click", () => {
  crayonBtn.classList.toggle("color-btn");

  // removing selection from other buttons
  pencilBtn.classList.remove("color-btn");
  paintBtn.classList.remove("color-btn");
  eraserBtn.classList.remove("color-btn");

  paint_erase = "paint";
  canvas.style.cursor = "default";

  // changing css for crayons
  resetCSS("crayon");
});

paintBtn.addEventListener("click", () => {
  paintBtn.classList.toggle("color-btn");

  // removing selection from other buttons
  pencilBtn.classList.remove("color-btn");
  crayonBtn.classList.remove("color-btn");
  eraserBtn.classList.remove("color-btn");

  paint_erase = "paint";
  canvas.style.cursor = "default";

  // changing css for paint brush
  resetCSS("paint");
});

eraserBtn.addEventListener("click", () => {
  eraserBtn.classList.toggle("color-btn");

  // removing selection from other buttons
  pencilBtn.classList.remove("color-btn");
  crayonBtn.classList.remove("color-btn");
  paintBtn.classList.remove("color-btn");

  if (paint_erase == "paint") {
    paint_erase = "erase";
    // changing the cursor icon to an eraser
    canvas.style.cursor = "url('./assets/eraser.png') 5 5, auto";
  } else {
    eraserBtn.classList.remove("color-btn");
    paint_erase = "paint";
    canvas.style.cursor = "default";
  }
});

// functions

function resetCSS(name) {
  // showing crayons and hiding other tools
  let crayonContainer = document.querySelector(".crayons");
  let pencilContainer = document.querySelector(".pencils");
  let paintContainer = document.querySelector(".brush");

  if (name === "crayon") {
    // hiding other tools
    pencilContainer.style.display = "none";
    paintContainer.style.display = "none";

    // showing crayons
    crayonContainer.style.display = styles.display;
    crayonContainer.style.flexDirection = styles.flexDirection;
    crayonContainer.style.alignItems = styles.alignItems;
    crayonContainer.style.justifyContent = styles.justifyContent;
    crayonContainer.style.flexWrap = styles.flexWrap;
    crayonContainer.style.margin = styles.margin;
    crayonContainer.style.height = styles.height;
    crayonContainer.style.animation = styles.animation;
  } else if (name === "pencil") {
    // hiding other tools
    crayonContainer.style.display = "none";
    paintContainer.style.display = "none";

    // showing crayons
    pencilContainer.style.display = styles.display;
    pencilContainer.style.flexDirection = styles.flexDirection;
    pencilContainer.style.alignItems = styles.alignItems;
    pencilContainer.style.justifyContent = styles.justifyContent;
    pencilContainer.style.flexWrap = styles.flexWrap;
    pencilContainer.style.margin = styles.margin;
    pencilContainer.style.height = styles.height;
    pencilContainer.style.animation = styles.animation;
  } else if (name === "paint") {
    // hiding other tools
    crayonContainer.style.display = "none";
    pencilContainer.style.display = "none";

    // showing crayons
    paintContainer.style.display = styles.display;
    paintContainer.style.flexDirection = styles.flexDirection;
    paintContainer.style.alignItems = styles.alignItems;
    paintContainer.style.justifyContent = styles.justifyContent;
    paintContainer.style.flexWrap = styles.flexWrap;
    paintContainer.style.marginTop = "1rem";
    paintContainer.style.marginBottom = "1rem";
    paintContainer.style.marginRight = "8rem";
    paintContainer.style.height = styles.height;
    paintContainer.style.animation = styles.animation;
  }
}

function checkRainbow(clr) {
  if (
    clr.name === "pencil-rainbow.png" ||
    clr.name === "crayon-rainbow.png" ||
    clr.name === "-rainbow.png"
  ) {
    strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    return;
  } else {
    strokeStyle = clr.dataset.color;
  }
}
