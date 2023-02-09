let canvas = document.getElementById("canvas");
let canvasContainer = document.getElementById("canvaContainer");

canvas.height = 600;
canvas.width = 600;
let ctx = canvas.getContext("2d");
ctx.lineWidth = 2;

let prevX = null;
let prevY = null;

let draw = false;

let pencils = document.querySelectorAll(".pencil-color");
let crayons = document.querySelectorAll(".crayon-color");
let brushs = document.querySelectorAll(".paint-brush");

pencils = Array.from(pencils);
crayons = Array.from(crayons);
brushs = Array.from(brushs);

pencils.forEach((clr) => {
  clr.addEventListener("click", () => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = clr.dataset.color;

    // clr.style.transform = window.getComputedStyle(clr).getPropertyValue("transform");

    // changing the cursor style
    canvas.style.cursor = `url('./assets/pencils/${clr.name}'), auto`;
  });
});

crayons.forEach((clr) => {
  clr.addEventListener("click", () => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = clr.dataset.color;
  });
});

brushs.forEach((clr) => {
  clr.addEventListener("click", () => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 25;
    ctx.strokeStyle = clr.dataset.color;
  });
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("imag/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "sketch.png";
  a.click();
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
};

window.onload = () => {
  let colorBtn = document.createElement("div");
  colorBtn.classList.add("color-btn");

  let btnBg = document.createElement("div");
  btnBg.classList.add("btn-bg");

  btnBg.innerHTML = `<img src="./assets/tools/pencil.png" id="pencil-btn" alt="pencil">`;
  colorBtn.appendChild(btnBg);
  buttonsContainer.replaceChild(colorBtn, pencilBtn);

  // changing css for crayons
  resetCSS("pencil");
};

pencilBtn.addEventListener("click", () => {
  let colorBtn = document.createElement("div");
  colorBtn.classList.add("color-btn");

  let btnBg = document.createElement("div");
  btnBg.classList.add("btn-bg");

  btnBg.innerHTML = `<img src="./assets/tools/pencil.png" id="pencil-btn" alt="pencil">`;
  colorBtn.appendChild(btnBg);
  buttonsContainer.replaceChild(colorBtn, pencilBtn);

  // changing css for pencils
  resetCSS("pencil");
});

crayonBtn.addEventListener("click", () => {
  let colorBtn = document.createElement("div");
  colorBtn.classList.add("color-btn");

  let btnBg = document.createElement("div");
  btnBg.classList.add("btn-bg");

  btnBg.innerHTML = `<img src="./assets/tools/button-crayon.png" id="crayon-btn" alt="crayon">`;
  colorBtn.appendChild(btnBg);
  buttonsContainer.replaceChild(colorBtn, crayonBtn);

  // changing css for crayons
  resetCSS("crayon");
});

paintBtn.addEventListener("click", () => {
  let colorBtn = document.createElement("div");
  colorBtn.classList.add("color-btn");

  let btnBg = document.createElement("div");
  btnBg.classList.add("btn-bg");

  btnBg.innerHTML = `<img src="./assets/tools/button-paint.png" id="paint-btn" alt="paint">`;
  colorBtn.appendChild(btnBg);
  buttonsContainer.replaceChild(colorBtn, paintBtn);

  // changing css for paint brush
  resetCSS("paint");
});

eraserBtn.addEventListener("click", () => {
  let colorBtn = document.createElement("div");
  colorBtn.classList.add("color-btn");

  let btnBg = document.createElement("div");
  btnBg.classList.add("btn-bg");

  btnBg.innerHTML = `<img src="./assets/tools/button-eraser.png" id="eraser-btn" alt="eraser">`;
  colorBtn.appendChild(btnBg);
  buttonsContainer.replaceChild(colorBtn, eraserBtn);

  canvas.style.cursor = "url(./assets/eraser.png), auto";
});

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
  }
}
