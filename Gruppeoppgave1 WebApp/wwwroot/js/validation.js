function validateFirstname(firstname) {
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
    const ok = regexp.test(firstname);
    if (!ok) {
        $("#wrongFirstname").html("Firstname must contain 2 to 20 letters");
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
        $("#wrongLastname").html("Lastname must contain 2 to 50 letters");
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
        $("#wrongEmail").html("Email is not valid");
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
        $("#wrongPhone").html("Phone number must contain 8 numbers");
        $("#inputPhone").css({ "border-color": "red" });
        return false;
    }
    else {
        $("#wrongPhone").html("");
        $("#inputPhone").css({ "border-color": "green" });
        return true;
    }
}