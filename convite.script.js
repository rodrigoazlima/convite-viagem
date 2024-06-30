

function aceite() {
    addHistory("yes", 1)
    alert('Você aceitou viajar para floripa! :)');
    document.getElementById("chamada").style.display = 'none';
    document.getElementById("atendida").style.display = 'block';
    document.getElementById("CUPOM").innerHTML = convertHistoryToToken();
}

function recusa(btn) {
    addHistory("reject", 1)
    alert('Ah que danadinha!');
    desvia(btn);
}

function desvia(btn) {
    addHistory("evade", 1)
    btn.style.position = 'absolute';
    btn.style.bottom = 'min(' + geraPosicao(0, 100) + ' , 100% - 120px)';
    btn.style.left = geraPosicao(0, 100);
}

function geraPosicao(min, max) {
    return Math.random() * (max - min) + min + '%';
}

function convertHistoryToToken() {
    let history = getHistory();
    let y = encodeInteger(history.yes)
    let r = encodeInteger(history.reject)
    let e = encodeInteger(history.evade)
    let code = y + r + e;

    let encrypted = encryptString(code, "𝙰𝙻𝙼𝙴 ")
    return encrypted;
}

function getHistory() {
    return JSON.parse(localStorage.getItem("history"));
}

function addHistory(type, value) {
    let history = getHistory()
    if (!history)
        history = {
            "yes": 0, "reject": 0, "evade": 0,
            lastAction: new Date(),
        }
    history[type] += value;
    history.lastAction = new Date();
    localStorage.setItem("history", JSON.stringify(history));
}

const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz';
const charSetLength = charSet.length;
const maxDigits = 3;
const maxValue = Math.pow(charSetLength, maxDigits) - 1;

function encodeInteger(integer) {
    if (integer < 0 || integer > maxValue) {
        console.error(`Integer must be between 0 and ${maxValue}`);
    }

    let encodedString = '';

    do {
        const remainder = integer % charSetLength;
        encodedString = charSet[remainder] + encodedString;
        integer = Math.floor(integer / charSetLength);
    } while (integer > 0);

    // Pad with leading zeros if necessary to ensure 3 characters
    while (encodedString.length < maxDigits) {
        encodedString = '0' + encodedString;
    }
    return encodedString;
}

function decodeString(encodedString) {
    if (encodedString.length !== maxDigits) {
        console.error(`Encoded string must be exactly ${maxDigits} characters long`);
    }

    let integer = 0;

    for (let i = 0; i < encodedString.length; i++) {
        const char = encodedString[i];
        const index = charSet.indexOf(char);

        if (index === -1) {
            throw new Error('Character not found in the character set');
        }

        integer = integer * charSetLength + index;
    }

    return integer;
}
function encryptString(input, key) {
    if (input.length !== 9 || key.length !== 9) {
      throw new Error("Both input and key must be 9 characters long.");
    }
  
    let encrypted = '';
  
    for (let i = 0; i < 9; i++) {
      // Get the ASCII code of the input character and key character
      let inputCharCode = input.charCodeAt(i);
      let keyCharCode = key.charCodeAt(i);
      
      // Shift the input character by the key character's code
      let encryptedCharCode = inputCharCode + keyCharCode;
      
      // Ensure it stays a single character by taking modulo 256
      // This keeps it within the range of an extended ASCII table (0-255)
      encryptedCharCode = encryptedCharCode % 256;
      
      // Convert back to character and append to the encrypted string
      encrypted += String.fromCharCode(encryptedCharCode);
    }
  
    return encrypted;
  }