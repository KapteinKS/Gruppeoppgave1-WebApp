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
    let out = "<label for='timetable'>Reisedato</label>" +
        "<input id='timetable' class=\"routes_dropdown\" type=\"date\" onchange=\"getDepartures()\"/>";
    $("#date").html(out);
}

function getDepartures() {
    const route = $("#routes").val();
    $.get("ticket/getDepartures", function (deps) {
        let out = "<label for='depDates'>Klokkeslett</label>" +
            "<select id='depDates' class='routes_dropdown' onchange='passengers()'>" +
            "<option>Velg avreisetid</option>";
        for (const dep of deps) {
            let temp = dep.dep_location + "-" + dep.arr_location;
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
        "<input id='pass' type='number' class='routes_input' id='travelers'/ onChange='firstname()'>";
    $("#amPassengers").html(out);
}

function firstname() {
    let out =
        "<div class=\"form-separator\">" +
            "<label id='fornavn-label' for='inputFirst'>Fornavn:</label>" +
            "<input  type='text' id='inputFirst' class='routes_input' />" +
        "</div>" +

        "<div class=\"form-separator\">" +
            "<label for='inputLast'>Etternavn:</label>" +
            "<input type='text' id='inputLast' class='routes_input' />" +
        "</div>" + 

        "<div class=\"form-separator\">" +
            "<label for='inputPhone'>Telefon:</label>" +
            "<input type='tel' id='inputPhone' class='routes_input' />" +
        "</div>" +

        "<div class=\"form-separator\">" +
            "<label for='inputEmail'>Epost:</label>" +
            "<input type='email' id='inputEmail' class='routes_input' />" +
        "</div>";

    let button = "<button type='button' onclick='orderTicket()'>Bestill</button>";
    $("#confirm").html(button);
    $("#textInputs").html(out);
    $("#spacer").show();
}

function orderTicket() {
    var pricePer = 0;
    $.get("ticket/getDepartures", function (deps) {
        const route = $("#routes").val();
        for (const dep of deps) {
            let temp = dep.dep_location + "-" + dep.arr_location;
            if (temp === route) {
                pricePer = dep.price;
                break;
            }
        }
        
        var passengers = $("#pass").val();
        var price = pricePer * passengers;
        if (!isNaN(price)) {
            let bilett = {
                Route: $("#routes").val(),
                LeaveDate: $("#timetable").val(),
                HomeDate: "",
                Price: price,
                FirstName: $("#inputFirst").val(),
                LastName: $("#inputLast").val(),
                Phone: $("#inputPhone").val(),
                Email: $("#inputEmail").val(),
                Passengers: passengers
            };

            $.get("ticket/orderTicket", bilett, function (janei) {
                console.log(janei);
            });
        } else {
            console.log("Could not order ticket");
        }
    });
    
}
