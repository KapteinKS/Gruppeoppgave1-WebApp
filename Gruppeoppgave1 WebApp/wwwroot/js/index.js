$(function () {
    $.get("ticket/getDepartures", function (departures) {
        getRoutes(departures);
    });
});

function getRoutes(departures) {
    let out = "<option selected>Velg rute</option>";
    /*"<select id='routes' onchange='getDepartures()' class='routes_dropdown'>" +
        "<option selected>Velg rute</option>";*/
    
    for (let departure of departures) {            
        out += "<option value='" + departure.dep_location + "-" + departure.arr_location + "'>"
            + departure.dep_location + " - " + departure.arr_location + "</option>";
    }
    $("#routes").html(out);
}

function getDates() {
    let out = "<input class=\"routes_dropdown\" type=\"date\" onchange=\"getDepartures()\"/>";
    $("#date").html(out);
}

function getDepartures() {
    const route = $("#routes").val();
    console.log(route);
    $.get("ticket/getDepartures", function (deps) {
        let out = "<select class='routes_dropdown' onchange='passengers()'>" + 
            "<option>Velg avreisetid</option>";
        for (const dep of deps) {
            let temp = dep.dep_location + "-" + dep.arr_location;
            console.log(temp);
            if (temp === route) {
                out += "<option>" + dep.dep_time + "</option >";
            }
        }
            
        out += "</select>";

        $("#times").html(out);
    });
}

function passengers() {
    let out = "<label for='travelers'>Hvor mange reisende?</label>" +
        "<input type='number' id='travelers'/ onChange='nextWindow()'>";
    $("#amPassengers").html(out);
}

function nextWindow() {
    //<button onclick="window.location.href = 'purchase.html';" class="routes_dropdown">Neste</button>
    let out = "<button onclick=\"window.location.href = \'purchase.html\';\" class=\"routes_dropdown\">Neste</button>";
    $("#nextWindow").html(out);
}