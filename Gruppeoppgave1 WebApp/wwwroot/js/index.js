$(function () {
    $.get("ticket/getDepartures", function (departures) {
        getRoutes(departures);
    });
});

function getRoutes(departures) {
    let out = "<select name='routes' onchange='getDepartures()' class='routes_dropdown'>" + 
        "<option selected>Pick a route</option>";
    if (departures != null) {
        for (const departure in departures) {
            out += "<option value='" + departure.Dep_location + "-" + departure.Arr_location + "'>"
                + departure.Dep_location + " - " + departure.Arr_location + "</option>";
        }
    }
    out += "</select>";
    $("#route_dropdown").html(out);
}