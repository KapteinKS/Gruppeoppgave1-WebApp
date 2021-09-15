$(function(){
    getRoutes();
});

function getRoutes() {
    $.get("ticket/GetDepartures", function (departures) {
        let out = "<select name ='routes' class='routes_dropdown'>" + 
            "<option selected>Pick a route</option>";
        for (const departure in departures) {
            out += "<option value = " + departure.Dep_location + "-" + departure.Arr_location + ">"
                + departure.Dep_location + " - " + departure.Arr_location + "</option>";
        }
        out += "</select>"
        $("#route_dropdown").html(out);
    });
}