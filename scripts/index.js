const pearl =  "#EDF7F6";
const lightBlue = "#C0E8F9";
const teal = "#58D5D1";

let board = document.getElementById("board");
let currentCellId = null;

let emptyCells = 81;

let prefilledBoard = [];
let currentBoard = [];
let solutionBoard = [];
prefillBoard();

setupBoard();
document.addEventListener('keypress', (event) => {
    if(event.keyCode >= 49 && event.keyCode <= 57){
        updateNumber(event.key)
    }
});

document.addEventListener('keydown', (event) => {
    if(event.key == "Backspace"){
            deleteNumber(event.key);
    }
});

function updateNumber(key){
    if(currentCellId == null)
        return;

    let [row, col] = getRowCol(currentCellId)
    if(prefilledBoard[row][col] == 0){
        let tile = document.getElementById(currentCellId);
        tile.innerHTML = key;
        if(currentBoard[row][col] == 0) emptyCells--;
        currentBoard[row][col] = Number(key);
        if(currentBoard[row][col] != solutionBoard[row][col]){
            tile.classList.add("incorrect")
        } else {
            if(emptyCells == 0) alert("Completed")
            tile.classList.remove("incorrect")
        }
    }

}

function deleteNumber(key){
    if(currentCellId == null)
        return;

    let [row, col] = getRowCol(currentCellId)
    if(prefilledBoard[row][col] == 0){
        let tile = document.getElementById(currentCellId);
        tile.innerHTML = "";
        if(currentBoard[row][col] != 0) emptyCells++;
        currentBoard[row][col] = 0;
        
    }

}

function setupBoard(){
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++){
            let tile = document.createElement("div");
            tile.id = getId(row, col);
            tile.classList.add("tile");
            updateBoxBorders(tile, row, col);
            tile.addEventListener("click", highlightCell);
            if(prefilledBoard[row][col] != 0){
                tile.classList.add("prefilled")
                tile.innerHTML = prefilledBoard[row][col].toString()
                emptyCells--;
            } else {
                tile.classList.add("not-prefilled")
            }
            board.appendChild(tile);
        }
    }
}

function updateBoxBorders(tile, row, col){
    if(col % 3 == 0)
        tile.classList.add("left-box-line");
    if(row % 3 == 0)
        tile.classList.add("top-box-line");
    if(col % 3 == 2)
        tile.classList.add("right-box-line");
    if(row % 3 == 2)
        tile.classList.add("bottom-box-line");
}

function prefillBoard(){
    
    
    solutionBoard.push([3,8,7,4,9,1,6,2,5]);
    solutionBoard.push([2,4,1,5,6,8,3,7,9]);
    solutionBoard.push([5,6,9,3,2,7,4,1,8]);
    solutionBoard.push([7,5,8,6,1,9,2,3,4]);
    solutionBoard.push([1,2,3,7,8,4,5,9,6]);
    solutionBoard.push([4,9,6,2,5,3,1,8,7]);
    solutionBoard.push([9,3,4,1,7,6,8,5,2]);
    solutionBoard.push([6,7,5,8,3,2,9,4,1]);
    solutionBoard.push([8,1,2,9,4,5,7,6,3]);



    prefilledBoard.push([0,0,7,4,9,1,6,0,5]);
    prefilledBoard.push([2,0,0,0,6,0,3,0,9]);
    prefilledBoard.push([0,6,0,0,0,7,0,1,0]);
    prefilledBoard.push([0,5,8,6,0,0,0,0,4]);
    prefilledBoard.push([0,0,3,0,0,0,0,9,0]);
    prefilledBoard.push([0,0,6,2,0,0,1,8,7]);
    prefilledBoard.push([9,0,4,0,7,0,0,0,2]);
    prefilledBoard.push([6,7,0,8,3,0,0,0,0]);
    prefilledBoard.push([8,1,0,0,4,5,0,0,0]);

    for(let i = 0; i < 9; i++){
        let row = [];
        for(let j = 0; j < 9; j++){
            row.push(prefilledBoard[i][j])
        }
        currentBoard.push(row);
    }
}

function highlightCell(){
    clearBackgroundColor();
    let [row, col] = getRowCol(this.id) 
    let tileIdsToHighlight = getTileIdsToHighlight(row, col);
    for(tileId in tileIdsToHighlight){
        highlight(tileIdsToHighlight[tileId]);
    }
    this.style.backgroundColor = teal;
    currentCellId = this.id;
}

function highlight(tileId){
    let tile = document.getElementById(tileId);
    tile.style.backgroundColor = lightBlue;
}

function getRowCol(id){
    let rowCol = id.split("-");
    return [rowCol[0], rowCol[1]];
}

function getId(row, col){
    return row.toString() + "-" + col.toString();
}

function clearBackgroundColor(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let tile = document.getElementById(getId(i,j));
            tile.style.backgroundColor = pearl;
        }
    }
}

function getTileIdsToHighlight(row, col){
    let boxLeft = Math.floor(col / 3) * 3;
    let boxTop = Math.floor(row / 3) * 3;
    let boxRows = [boxTop, boxTop + 1, boxTop + 2]
    let boxCols = [boxLeft, boxLeft + 1, boxLeft + 2]

    let tileIds = [];
    for(const boxRow in boxRows){
        for(const boxCol in boxCols){
            if(boxRows[boxRow] != row || boxCols[boxCol] != col)  tileIds.push(getId(boxRows[boxRow], boxCols[boxCol]));
        }
    }

    for(let lineRow = 0; lineRow < 9; lineRow++){
        tileIds.push(getId(lineRow, col));
    }

    for(let lineCol = 0; lineCol < 9; lineCol++){
        tileIds.push(getId(row, lineCol));
    }
    
    return tileIds;
}




