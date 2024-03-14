var board;
var playerO = "O";
var playerX = "X";
var curPlayer = playerO;
var gameOver = false;
var moves = 0;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    // create tiles and populate the board
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {

            // add div element for each tile
            let tile = document.createElement("div");
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add("tile");

            // add horizontal or vertical line to tile element
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line")
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line")
            }

            // populate the board
            document.getElementById("board").append(tile)

            tile.addEventListener("click", setTile);
        }
    }
}

function setTile() {
    // if someone won, then no more clicks
    if (gameOver) {
        return;
    }

    // get coordinates of tile element
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // if tile is not available, then click will not do anything
    if (board[r][c] != ' ') {
        return;
    }

    // set tile to current player
    board[r][c] = curPlayer;
    this.innerText = curPlayer;
    moves++;

    checkWinner();
    checkTie();

    // alternate between players
    let player = document.getElementById("player");
    if (curPlayer == playerO) {
        curPlayer = playerX;
        player.innerText = playerX;
    }
    else {
        curPlayer = playerO;
        player.innerText = playerO;
    }

}

function checkWinner() {
    var announceWinner = function announceWinner(player) {
        setTimeout(function() {
            alert(player + " is the winner!");
            location.reload(true);
        });
    }

    // horizontally
    for (let r = 0; r < 3; r++) {
        if(board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + '-' + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            let player = curPlayer;
            announceWinner(player);
            return;
        }
    }

    // vertically
    for (let c = 0; c < 3; c++) {
        if(board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + '-' + c.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            let player = curPlayer;
            announceWinner(player);
            return;
        }
    }

    // diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + '-' + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        let player = curPlayer;
        announceWinner(player);
        return;
    }

    // anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        // 0-2
        let tile = document.getElementById('0-2');
        tile.classList.add("winner");
        // 1-1
        tile = document.getElementById('1-1');
        tile.classList.add("winner");
        // 2-0
        tile = document.getElementById('2-0');
        tile.classList.add("winner");

        gameOver = true;
        let player = curPlayer;
        announceWinner(player);
        return;
    }
}

function checkTie() {
    if (!gameOver && moves == 9) {
        gameOver = true;
        setTimeout(function() { 
            alert("TIE!");
            location.reload(true);
        });
    }
}