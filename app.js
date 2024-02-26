let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let audioTurn = new Audio("ting.mp3");
let gmusic = new Audio("music.mp3");
let gameover = new Audio("gameover.mp3");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw



// (function (){ 
//   gmusic.play();
//   })();

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],

];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  
  // msgContainer.classList.add("hide");
};

const newgame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  resetBtn.classList.remove("hide");
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      // audioTurn.play();
      turnO = false;
    } else {
      //playerX
      box.classList.add("fontforbox");
      box.innerText = "X";
      // audioTurn.play();
      turnO = true;
    }
    audioTurn.play();
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  resetBtn.classList.add("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("extra");
    box.classList.remove("fontforbox");
    // box.style.backgroundColor = ffffc7;
    ;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  
  msgContainer.classList.remove("hide");
  resetBtn.classList.add("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        boxes[pattern[0]].classList.add("extra");
        boxes[pattern[1]].classList.add("extra");
        boxes[pattern[2]].classList.add("extra");
        gameover.play();
        // boxes[pattern[0]].style.backgroundColor = "red";
        // boxes[pattern[1]].style.backgroundColor = "red";
        // boxes[pattern[2]].style.backgroundColor = "red";
        showWinner(pos1Val);
        
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", newgame);
resetBtn.addEventListener("click", resetGame);
