let init = (() => {
    let paused;
    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'circle';
    const boxes = document.querySelectorAll(".box");
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], 
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const winningMessage = document.querySelector(".winningMessage");
    const btnRestart = document.querySelector(".btnRestart");
    let circleTurn;
    boxes.forEach(box => {
        box.addEventListener('click', handleClick, {once: true});
    });
    btnRestart.addEventListener('click', function() {
        paused = false;
        boxes.forEach(box => {
            box.style.backgroundColor.remove;
            box.textContent = "";
            box.classList.remove(X_CLASS);
            box.classList.remove(CIRCLE_CLASS);
            box.removeEventListener('click', handleClick, {once: true});
            box.addEventListener('click', handleClick, {once: true});
            winningMessage.style.color = "white";
            circleTurn = false;
        });
    });
    function handleClick(e) {
        if(!paused) {
            const box = e.target;
            const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
            placeMark(box, currentClass);
            if(checkWin(currentClass)) {
                endGame(false);
            } else if (isDraw()) {
                endGame(true);
            } else {
                swapTurn();
            }
        }
    }
    function placeMark(box, currentClass) {
        box.classList.add(currentClass);
        let mark = circleTurn ? "O" : "X";
        box.textContent = mark;
    }
    function swapTurn() {
        circleTurn = !circleTurn;
    }
    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return boxes[index].classList.contains(currentClass);
            });
        });
    }
    function endGame(draw) {
        if(draw) {
            winningMessage.innerText = "It's a draw!";
        } else {
            winningMessage.innerText = circleTurn ? "O wins!" : "X wins!";
        }
        winningMessage.style.color = "black";
        paused = true;
    }
    function isDraw() {
        return [...boxes].every(box => {
            return box.classList.contains(X_CLASS) || box.classList.contains(CIRCLE_CLASS);
        })
    }
})();