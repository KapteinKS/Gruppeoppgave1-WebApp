$(function () {
    $.get("ticket/getDepartures", function (departures) {
        getRoutes(departures);
    });
});

//this method gets all routes
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


//this method adds a datepicker for when the customer wants to leave
function getDates() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    let out = "<label for='timetable'>Reisedato</label>" +
        //making sure people can't order in the past and not too far in the future
        "<input id='timetable' class=\"routes_dropdown\" type=\"date\" min=\"" + today + "\" max=\"2023-12-31\" />";
    $("#date").html(out);
    getDepartures();
}

//this method adds a select for the time of departure, not really used in this version, as we've decided each boat leaves daily, at the same time
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

//this method adds an input field for the amount of tickets you're ordering at the same time
function passengers() {
    if (!$.trim($('#amPassengers').html()).length ){
        let out = "<label for='travelers'>Hvor mange reisende?</label>" +
            "<input id='pass' type='number' min='1' max='10' class='routes_input' id='travelers'/ onChange='firstname()'>";
        $("#amPassengers").html(out);
    }
}

//this method adds input fields for first and last name, phone and email
function firstname() {
    var pricePer = 0;
    $.get("ticket/getDepartures", function (deps) {
        const route = $("#routes").val();

        //finding price per passenger for the route
        for (const dep of deps) {
            let temp = dep.dep_location + "-" + dep.arr_location;
            if (temp === route) {
                pricePer = dep.price;
                break;
            }
        }
        var passengers = $("#pass").val();
        var price = pricePer * passengers;
        $("#price_tag").html("Pris: " + price);
    });
    
    if (!$.trim($('#textInputs').html()).length) {
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
            "</div>" +

            "<div id=\"confirm\" class=\"form-separator\">" +
            "</div>"

        let button = "<button type='button' class='routes_dropdown order-button' onclick='orderTicket()'>Bestill</button>";
        $("#textInputs").html(out);
        $("#confirm").html(button);
        $("#spacer").show();
    }
}

//this method creates and orders a ticket for x amount of passengers, will soon also include input validation
function orderTicket() {
    var pricePer = 0;
    $.get("ticket/getDepartures", function (deps) {
        const route = $("#routes").val();

        //finding price per passenger for the route
        for (const dep of deps) {
            let temp = dep.dep_location + "-" + dep.arr_location;
            if (temp === route) {
                pricePer = dep.price;
                break;
            }
        }

        //finding amount of passengers, and multiplying price for total price
        var passengers = $("#pass").val();
        var price = pricePer * passengers;
        //creating the ticket
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

            //placing the order, and changing window

            if (valider()) {
                $.get("ticket/orderTicket", bilett, function (janei) {
                    console.log(janei);
                    window.location.href = "listTickets.html";
                });
                alert("Din bilett er bestilt!");
            } else {
                alert("Feil ble oppdaget i inputfelt!");
                console.log("Wrong input detected");
            }

        } else {
            console.log("Could not order ticket");
        }
    });
 };
    
function valider() {
    const routeOK = validateRoute($("#route").val());
    const dateOK = validateDate($("#timetable").val());
    const timesOK = validateTime($("#times").val());
    const passengersOK = validatePassengers($("#pass").val());
    const firstnameOK = validateFirstname($("#inputFirst").val());
    const lastnameOK = validateLastname($("#inputLast").val());
    const phoneOK = validatePhone($("#inputPhone").val());
    const emailOK = validateEmail($("#inputEmail").val());
    if (routeOK && dateOK && timesOK && passengersOK && firstnameOK && lastnameOK && phoneOK && emailOK) {
        return true;
    }
}
