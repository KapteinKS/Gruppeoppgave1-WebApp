$(function () {
    $.get("ticket/getDepartures", function (departures) {
        getRoutes(departures);
    });
});

function getRoutes(departures) {
    let out = "<select id='routes' onchange='getDepartures()' class='routes_dropdown'>" + 
        "<option selected>Velg rute</option>";
    
    for (let departure of departures) {            
        out += "<option value='" + departure.dep_location + "-" + departure.arr_location + "'>"
            + departure.dep_location + " - " + departure.arr_location + "</option>";
    }
    out += "</select>";
    $("#route_dropdown").html(out);
}

function getDepartures() {
    const route = $("#routes").val();
    $.get("ticket/getDepartures", function (deps) {
        let out = "<select class='routes_dropdown'>" + 
            "<option selected>Velg avreisetid</option>";
        for (const dep of deps) {
            let temp = dep.dep_location + "-" + dep.arr_location;
            if (temp === route) {
                out += "<option>" + dep.dep_time + "</option >";
                break;
            }
        }
            
        out += "</select >";

        $("#times").html(out);
    });
}