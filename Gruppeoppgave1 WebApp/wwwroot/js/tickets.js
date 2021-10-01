$(function () {
    getTickets();
});

function getTickets() {
    $.get("ticket/getTickets", function (tickets) {
        formatTickets(tickets);
    });
}

function formatTickets(tickets) {
    let out = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Strekning</th><th>Dato</th><th>E-post</th><th>Fornavn</th><th>Etternavn</th><th>Antall passasjerer</th><th>Totalpris</th>" +
        "</tr>";
    
    for (let ticket in tickets) {
        console.log(ticket);
        out += "<tr>" +
            "<td>" + ticket.route + "</td>" +
            "<td>" + ticket.leaveDate + "</td>" +
            "<td>" + ticket.email + "</td>" +
            "<td>" + ticket.firstName + "</td>" +
            "<td>" + ticket.lastName + "</td>" +
            "<td>" + ticket.passengers + "</td>" +
            "<td>" + ticket.price + "</td>" +
            "</tr>";
    }
    out += "</table>";
    $("#tickets").html(out);
}