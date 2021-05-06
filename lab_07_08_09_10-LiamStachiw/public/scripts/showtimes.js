let imdb_id = 'tt3896198'

window.onload = function(){

    $("#submit").click(function() {
        console.log($('#date').val())
        generateTable();
    })

    $('.showtimeRow').click(function() {
        populateForm($(this).attr('id'));
    });

    $('#movieDetails').hide();
}

// function generateTable() {
//     fetch('showtimes.json')
//     .then((response) => response.json())
//     .then(function(showtimes) {
//         var selectedDate = new Date($('#date').val());
//         for (let i = 0; i < showtimes.length; i++) {
//             var showtimeDate = new Date(showtimes[i].date);   
//             if(selectedDate.toLocaleDateString() == showtimeDate.toLocaleDateString()){
                
//                 var newHeader = document.createElement('th');
//                 newHeader.innerText = showtimes[i].title;

//                 var newTimes = document.createElement('td');
//                 var newTimesList = document.createElement('ul');

//                 for (let j = 0; j < showtimes[i].times.length; j++) {
//                     var newListItem = document.createElement('li');
//                     newListItem.textContent = showtimes[i].times[j];
//                     newTimesList.appendChild(newListItem);
//                 }

//                 newTimes.appendChild(newTimesList);

//                 var newTableRow = document.createElement('tr');
//                 newTableRow.setAttribute('class', 'showtimeRow');
//                 newTableRow.setAttribute('id', showtimes[i].id);
//                 newTableRow.appendChild(newHeader);
//                 newTableRow.appendChild(newTimes);
//                 $('#showtimes').append(newTableRow);
//             }
//         }

//         $('.showtimeRow').click(function() {
//             populateForm($(this).attr('id'));
//         });
//     });
// }

function populateForm(id) {

    document.getElementById('rating').innerHTML = '';

    fetch('http://www.omdbapi.com/?i=' + id + '&apikey=3da1ad3e')
    .then((response) => response.json())
    .then(function(movie) {

        $("#poster").attr("src", movie.Poster);
        $("#title").attr("value", movie.Title);
        $("#year").attr("value", movie.Year);
        $("#genre").attr("value", movie.Genre);
        $("#runtime").attr("value", movie.Runtime);
        $("#director").attr("value", movie.Director);
        $("#writer").text(movie.Writer);
        $("#actors").text(movie.Actors);
        $("#plot").text(movie.Plot);  
        
        for(var i = 0; i < Math.floor(movie.imdbRating); i++){

            var trophy = document.createElement("img");
            trophy.setAttribute("alt", "Trophy Icon");
            trophy.setAttribute("src", "./images/trophy.png");

            $("#rating").append(trophy);
        }
    });

    $('#movieDetails').show();

}