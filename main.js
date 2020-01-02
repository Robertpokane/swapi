const baseURL = "https://swapi.co/api/";

function getData(type, cb) { // cb is call back
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type + "/"); // apends the baseURL with the type so https://swapi.co/api + people + /
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { //wait for api to load and for thesite to be ready
            cb(JSON.parse(this.responseText)); // change data to JSOn readable format
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];
    Object.keys(obj).forEach(function (key) {
        tableHeaders.push(`<td>${key}</td>`)
    });
    return `<tr>${tableHeaders}</tr>`;
}


function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");
    

    getData(type, function (data) {// calling getData function, passing 2 arguments, type and function, type is in type of people/spaceship ect. 
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function (item) {
            var dataRow = [];

            Object.keys(item).forEach(function (key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15)
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);

        });
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}
