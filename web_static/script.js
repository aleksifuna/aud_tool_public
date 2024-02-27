let my_array = [];
let currentDate = new Date();
let options = { day: 'numeric', month: 'numeric', year: 'numeric' };
let formattedDate = currentDate.toLocaleDateString('en-GB', options);
let all_logs = my_array.length;


function buildTable(data, total) {
    data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    let table = document.getElementById('table-body');
    let pp = ((data.length / total) * 100).toFixed(2);
    table.innerHTML = '';
    for (let i = 0; i < data.length; i++){
        let row =   `<tr>
                    <td>${data[i].datetime}</td>
                    <td>${data[i].artist}</td>
                    <td>${data[i].title}</td>
                    </tr>`;
        table.innerHTML += row;
    }
    $('#total-plays').text(data.length);
    $('#Percentage-play').text(pp + ' %');
}

function searchTable(value, data) {
    let filteredData = [];
    for (let i = 0; i < data.length; i++){
        value = value.toLowerCase();
        let name = data[i].title + data[i].artist;
        name = name.toLowerCase();
        if (name.includes(value)) {
            filteredData.push(data[i]);
        }
    }
    return filteredData;    
}

$(document).ready(() => {
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:5000',
        success: function(response){
            my_array = response;
            all_logs = my_array.length;
            buildTable(my_array, all_logs);
        }
    });


    $('#date').text('Date: ' + formattedDate);
});

$('#searchButton').click(() => {
    let artistName = $('#artistSearchInput').val();
    let searched = searchTable(artistName, my_array);
    buildTable(searched, all_logs);
})
