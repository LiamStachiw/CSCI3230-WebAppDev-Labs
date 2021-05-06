//creating an array used to create the game board
let nums = [[-1,6,-1,3,-1,-1,8,-1,4],
            [5,3,7,-1,9,-1,-1,-1,-1],
            [-1,4,-1,-1,-1,6,3,-1,7],
            [-1,9,-1,-1,5,1,2,3,8],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [7,1,3,6,2,-1,-1,4,-1],
            [3,-1,6,4,-1,-1,-1,1,-1],
            [-1,-1,-1,-1,6,-1,5,2,3],
            [1,-1,2,-1,-1,9,-1,8,-1]]

window.onload = function() {

    var selectedNum = -1;
    var gameBoard = document.getElementById("board");

    //creating the gameboard using the the 2-d array
    for (let i = 1; i <= 9; i++) {
        var row = document.createElement("tr");
        row.className = "board-row"
        
        for (let j = 1; j <= 9; j++) {
            var cell = document.createElement("td");
            cell.className = "board-cell";
            cell.setAttribute("id", "cell" + i + j);
            cell.textContent = nums[i-1][j-1];
            row.appendChild(cell);
        }
        gameBoard.appendChild(row);     
    }
    checkNums();

    var undoBoardState = gameBoard.innerHTML;

    // Gathering the elements to add event handlers
    var controls = document.getElementsByClassName('controls-cell');
    var cells = document.getElementsByClassName('board-cell');

    // Creating an event handler for the controls row
    var controlsHandler = function() {
        //if it is the undo button
        if(this.id == "btnUndo") {
            gameBoard.innerHTML = undoBoardState;
            for (let i = 0; i < cells.length; i++) {
                cells[i].addEventListener('click', cellsHandler, false);
            }
            checkNums();
        } else {
            clearSelected();
            selectedNum = this.textContent;
            this.style.backgroundColor = "#f2f2f2";
        }
    }

    //creating an event handler for the board cells
    var cellsHandler = function() {
        //if the does not have a value of -1
        if (selectedNum != -1) {
            undoBoardState = gameBoard.innerHTML;
            this.textContent = selectedNum;
            selectedNum = -1;
            checkNums()
        }
    }

    // Assigning the event handler to the control cells
    for (let i = 0; i < controls.length; i++) {
        controls[i].addEventListener('click', controlsHandler, false);
    }

    //assigning the event handler to the board cells
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', cellsHandler, false);
    }

}

//function to check the numbers for value and conflicts, and set the style accordingly
function checkNums(){
    var table = document.getElementById('board');
    var elements = document.getElementsByClassName("board-cell");
    var controls = document.getElementsByClassName("controls-cell");

    //un-highlight the selected number
    clearSelected();

    //check if element is -1
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent === "-1") {
            elements[i].style.fontSize = "0";
        } else {
            elements[i].style.fontSize = "115%";
        }
        
    }

    //check rows for conflicts
    var badRow = [];
    var row, rows = table.rows;
    var cell, cells;

    //for each row in the board
    for (let i = 0; i < rows.length; i++) {
        row = rows[i];
        cells = row.cells;

        //for each cell in the row
        for (let j = 0; j < cells.length; j++) {
            cell = cells[j];

            //compare the cell to each cell in the same row
            for (let k = 0; k < cells.length; k++) {

                //if the cell is not the same and there is a conflict, add it to an array
                if(k != j && sameElement(cells[k], cell)){
                    badRow.push(cells[k]);        
                }
            }        
        }       
    }


    //check columns for conflicts
    var badCol = [];

    //for each column in the board
    for (let i = 0; i < elements.length / 9; i++) {
        
        //for each cell in the column
        for (let j = 0; j < elements.length; j += 9) {
            
            //compare the cell to each cell in the same column
            for (let k = 0; k < elements.length; k += 9) {

                //if the cell is not the same and there is a conflict, add it to an array
                if(k != j && sameElement(elements[k+i], elements[j+i])){
                    badCol.push(elements[k+i]);         
                }     
            }
        }
    }

    //check blocks for conflicts
    var badBlock = []
    var blockCount = 1;

    //for each block in the board
    for (let i = 0; i < elements.length; i += 3) {
        var cellCount = 1;

        //for each cell in the block
        for (let j = 0; j < elements.length / 3; j++) {
            var cellCountCheck = 1;

            //compare the cell to each cell in the same block
            for (let k = 0; k < elements.length / 3; k++) {

                //if the cell is not the same and there is a conflict, add it to an array
                if(j != k && sameElement(elements[k+i], elements[j+i])){
                    badBlock.push(elements[k+i]);
                }
                
                //if the first row of the block has been checked, move to the next row
                if(cellCountCheck % 3 == 0){
                    k += 6;
                }
                cellCountCheck += 1;
            }

            //if the first row of the blkock has been checked, move to the next row
            if(cellCount % 3 == 0){
                j += 6;
            }
            cellCount += 1;
        }

        //if the first row of blocks had been checked, move to next row of blocks
        if(blockCount % 3 == 0){
            i += 18;
        }
        blockCount += 1;
    }

    //assigning the correct background colour to the cells
    for (let i = 0; i < elements.length; i++) {
        //if the current element has a conflict in any of the row, column or block, set the style accordingly
        if(badRow.includes(elements[i]) || badCol.includes(elements[i]) || badBlock.includes(elements[i])){
            elements[i].style.backgroundColor = "#f76c5e";
        } else {
            elements[i].style.backgroundColor = null;
        }
        
    }

}

//function to check if two cells have the same text content (ie. there is a conflict)
function sameElement(x1, x2) {
    if (x1.textContent != '-1' || x2.textContent != '-1') {
        return x1.textContent == x2.textContent;
    } else {
        return false;
    }
 }

 //function to clear the background colour of the controls cells when a new one is seleceted
function clearSelected() {
    var controls = document.getElementsByClassName('controls-cell');

    for (let i = 0; i < controls.length; i++) {
        controls[i].style.backgroundColor = null;    
    }
 }