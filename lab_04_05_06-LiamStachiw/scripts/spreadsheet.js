var itemsArray;

window.onload = function() {

    fetch('./grades.csv')   //using relative path to bypass a CORS error
    .then((response) => response.text())
    .then(function(content) {
        let lines = content.split('\n');
        for(var i = 0; i < lines.length; i++){
            var words = lines[i].split(',');
            var newRow = document.createElement('tr');
                for(var j = 0; j < words.length; j++){
                    if(i == 0){
                        var newCell = document.createElement('th');
                        if(j != 0){                           
                            newCell.classList.add('col-header');
                        } 
                            newCell.innerText = words[j];
                    } else {
                        if(j == 0){
                            var newCell = document.createElement('th');
                            newCell.classList.add('row-header');
                        } else {
                            var newCell = document.createElement('td');
                        }
                        newCell.innerText = words[j];
                    }
                    newRow.appendChild(newCell);
                
                $('.spreadsheet').append(newRow);
            }
        }
    }).then(function() {
        $(".col-header").click(function() {
            //get the index of the header in the table row
            selectColumn($(this).index());
        });
        $(".row-header").click(function() {
            //get the index of the row that the header is contianed in
            selectRow($(this).parent().index());
        });
    
        //add click event handler to all td elements
        $("td").click(function(){
            editCell(this)
        });
    });

}

//function to change the cell to an input and allow editing
function editCell(object){
    var temp = $(object).text();
    $(object).html('<input type=\"text\" value=\"'+temp+'\">');
    $(object).find("input").focus();
    
    $(object).find("input").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            removeCell(this);  
        }
    })
}

//function to change the input back to text when enter is pressed
function removeCell(object){
    var temp = $(object).val();
    $(object).parent().html(temp);
}

function deselectAll() {
    //remove the background color of all cells in the spreadsheet
    $(".spreadsheet td").css("background-color", "");

    itemsArray = [];
}

function selectRow(rowIndex) {
    deselectAll();
    //set the background color of all td elements in the selected row
    $(".spreadsheet tr:nth-child("+(rowIndex+1)+") td").css("background-color", "#f0f0ff");
    itemsArray = $(".spreadsheet tr:nth-child("+(rowIndex+1)+") td").map(function() {
        return $(this).text();
    }).get();

    makeChart(itemsArray);
}

function selectColumn(colIndex) {
    deselectAll();
    //set the background color of all td elements in the selected column
    $(".spreadsheet tr td:nth-child("+(colIndex+1)+")").css("background-color", "#f0f0ff");
    itemsArray = $(".spreadsheet tr td:nth-child("+(colIndex+1)+")").css("background-color", "#f0f0ff").map(function() {
        return $(this).text();
    }).get();

    makeChart(itemsArray);
}

