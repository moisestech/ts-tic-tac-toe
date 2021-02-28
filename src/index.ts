import "./style.css";

// start with a couple of elements that we get off the page using element by ID
const appElement = document.getElementById("app");
const boardElement = document.getElementById("board");

// constants to represent the number of ROWs and COLLUMNs that are on the board
const ROW_COUNT = 3;
const COL_COUNT = 3;

// we have a boardState variable which holds wether there is an X or an O in each of the Cells 
let boardState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

// another variable determining who's turn it is
let currentMove: "X" | "O" = "X";

// a function that creates each of these cells
// takes in the row and the collumn which the cell is positined in and the content of the cell
function createCell(row: number, col: number, content = "") {
  const cell = document.createElement("button");
  cell.setAttribute("data-row", row.toString());
  cell.setAttribute("data-col", col.toString());
  cell.setAttribute("data-content", content);
  cell.classList.add("cell");

  // return the cell is attributes so that we can use it in the renderBoard function
  return cell;
}

function renderBoard() {
  if (!appElement) throw new Error("Cannot find app");
  if (!boardElement) throw new Error("Cannot find board");
  boardElement.innerHTML = "";
  
  // Made in a way that it removes everything from the DOM and builds it from scratch.
  // We loop through the rows and columns and we add the new cell
  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      boardElement.appendChild(createCell(i, j, boardState[i][j]));
    }
  }

  // decides who's turned is it wether X or O
  const oldMoveElement = document.getElementById("move-element");
  if (oldMoveElement) { 
    oldMoveElement.remove();
  }

  const moveElement = document.createElement("p");
  moveElement.id = "move-element";
  moveElement.innerText = `Next Move: ${currentMove}`;
  moveElement.classList.add("current-move");
  appElement.insertBefore(moveElement, document.getElementById("reset"));
}

// resets the game
function init() {
  const resetButton = document.getElementById("reset");
  if (! resetButton) throw new Error("No Reset button");
  resetButton.addEventListener("click", () => {
    boardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    currentMove = "X";
    renderBoard();
  });

  renderBoard();
}

// generates a reset button at the beginning of the game 
// and renders our board for the first time
init();

// https://codesandbox.io/s/github/uidotdev/typescript-tic-tac-toe
// https://platform.ui.dev/courses/1207737/lectures/26978324