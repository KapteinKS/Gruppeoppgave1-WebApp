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
    console.log(route);
    $.get("ticket/getDepartures", function (deps) {
        let out = "<label for='depDates'>Klokkeslett</label>" +
            "<select id='depDates' class='routes_dropdown' onchange='passengers()'>" +
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
        "<input type='number' class='routes_input' id='travelers'/ onChange='firstname()'>";
    $("#amPassengers").html(out);
}

function firstname() {
    let out =
        "<div id=\"firstname\" class=\"form-separator\">" +
            "<label id='fornavn-label' for='inputFirst'>Fornavn:</label>" +
            "<input type='text' id='inputFirst' class='routes_input' />" +
        "</div>" +

        "<div id=\"lastname\" class=\"form-separator\">" +
            "<label for='inputLast'>Etternavn:</label>" +
            "<input type='text' id='inputLast' class='routes_input' />" +
        "</div>" + 

        "<div id=\"phone\" class=\"form-separator\">" +
            "<label for='inputPhone'>Telefon:</label>" +
            "<input type='tel' id='inputPhone' class='routes_input' />" +
        "</div>" +

        "<div id=\"email\" class=\"form-separator\">" +
            "<label for='inputEmail'>Epost:</label>" +
            "<input type='text' id='inputEmail' class='routes_input' />" +
        "</div>";

    let button = "<button type='button' class='routes_dropdown order-button' onclick='orderTicket()'>Bestill</button>";
    $("#confirm").html(button);
    $("#textInputs").html(out);
    $("#spacer").show();
}

function orderTicket() {
    console.log("Bestiller bilett");
    let price = getPrice();
    if (price !== NaN) {
        let bilett = {
            route: $("#routes").val(),
            leaveDate: $("#timetable").val(),
            homeDate: "",
            price: price,
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            passengers: $("#amPassengers").val()
        };

        $.get("ticket/orderTicket", bilett, function (janei) {
            console.log(janei);
        });
    } else {
        console.log("Could not order ticket");
    }
}

function getPrice() {
    $.get("ticket/getDepartures", function (deps) {
        const route = $("#routes").val();
        for (const dep of deps) {
            let temp = dep.dep_location + "-" + dep.arr_location;
            if (temp === route) {
                console.log("Price: " + dep.price);
                return dep.price;
            }
        }
        return NaN;
    });
}