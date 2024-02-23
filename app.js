var lengthField = document.getElementById("length");
var lengthOutput = document.getElementById("lengthOutput");

lengthField.addEventListener("input", function() {
    lengthOutput.textContent = this.value;
});

function genPassword() {
    var length = parseInt(lengthField.value);
    var includeUppercase = document.getElementById("uppercase").checked;
    var includeLowercase = document.getElementById("lowercase").checked;
    var includeNumbers = document.getElementById("numbers").checked;
    var includeSymbols = document.getElementById("symbols").checked;

    var chars = '';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()';

    var password = '';
    for (var i = 0; i < length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    document.getElementById("password").value = password;
}

function copyPassword() {
    var passwordField = document.getElementById("password");
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // Para dispositivos móviles
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}

function updateSecurityLevel(password) {
    var securityLevelElement = document.getElementById("securityLevel");
    if (password.length < 6) {
        securityLevelElement.textContent = "Weak Password";
        securityLevelElement.className = "low-security";
    } else if (password.length < 10) {
        securityLevelElement.textContent = "Medium Password";
        securityLevelElement.className = "medium-security";
    } else {
        securityLevelElement.textContent = "Strong Password";
        securityLevelElement.className = "high-security";
    }
}

function genPassword() {
    var length = parseInt(lengthField.value);
    var includeUppercase = document.getElementById("uppercase").checked;
    var includeLowercase = document.getElementById("lowercase").checked;
    var includeNumbers = document.getElementById("numbers").checked;
    var includeSymbols = document.getElementById("symbols").checked;

    var chars = '';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()';

    var password = '';
    for (var i = 0; i < length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    document.getElementById("password").value = password;
    updateSecurityLevel(password);
}

