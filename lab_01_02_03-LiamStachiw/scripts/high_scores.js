let scores = [{"date": "2021/02/20", "duration": "1:59"}, 
              {"date": "2021/01/24", "duration": "2:51"},
              {"date": "2021/01/17", "duration": "3:25"},
              {"date": "2020/12/07", "duration": "4:32"},
              {"date": "2020/11/24", "duration": "4:57"}]

window.onload = function() {

    var scoreBoard = document.getElementById("hiscores");

    for (let i = 0; i < scores.length; i++) {
        var row = document.createElement("tr");
        row.className = "score"
        
        for (let j = 0; j < 2; j++) {
            var cell = document.createElement("td");
            cell.className = "hiscores-data";

            if(j == 0){
                cell.textContent = scores[i].date;
            } else {
                cell.textContent = scores[i].duration;
            }
        
            row.appendChild(cell);
        }
        scoreBoard.appendChild(row);     
    }
}