﻿function validateFirstname(firstname) {
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
    const ok = regexp.test(firstname);
    if (!ok) {
        $("#wrongFirstname").html("Fornavn må inneholde 2 til 20 bokstaver");
        $("#inputFirst").css({ "border-color": "red" });
        return false;
    }
    else {
        $("#wrongFirstname").html("");
        $("#inputFirst").css({ "border-color": "green" });
        return true;
    }
}

function validateLastname(lastname) {
    const regexp = /^[0-9a-zA-ZæøåÆØÅ. \-]{2,50}$/;
    const ok = regexp.test(lastname);
    if (!ok) {
        $("#wrongLastname").html("Etternavn må inneholde 2 til 50 bokstaver");
        $("#inputLast").css({ "border-color": "red" });
        return false;
    }
    else {
        $("#wrongLastname").html("");
        $("#inputLast").css({ "border-color": "green" });
        return true;
    }
}

function validateEmail(email) {
    const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const ok = regexp.test(email);
    if (!ok) {
        $("#wrongEmail").html("Email er ikke gyldig");
        $("#inputEmail").css({ "border-color": "red" });
        return false;
    }
    else {
        $("#wrongEmail").html("");
        $("#inputEmail").css({ "border-color": "green" });
        return true;
    }
}

function validatePhone(phone) {
    const regexp = /^[0-9]{8}$/
    const ok = regexp.test(phone);
    if (!ok) {
        $("#wrongPhone").html("Telefonnummer må bestå av 8 tall");
        $("#inputPhone").css({ "border-color": "red" });
        return false;
    }
    else {
        $("#wrongPhone").html("");
        $("#inputPhone").css({ "border-color": "green" });
        return true;
    }
}