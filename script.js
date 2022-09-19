let palabras = ["TETRIS", "SONIC", "SNOWBROS", "WARCRAFT", "PACMAN"];
let tablero = document.getElementById("hanged").getContext("2d");
let palabraSecreta = "";
let errado = 100;
let cont = 0;
let letrasErroneas = [];

function chooseSecretWord() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabra;
    console.log(palabraSecreta);
}

function startGame() {
    document.getElementById("show-canvas").style.display = "block";
    document.getElementById("first-section").style.display = "none";
    document.getElementById("first-btn").style.display = "none";

    chooseSecretWord();
    paintCanvas();
    paintLine();
    pressLetter();
}

function paintCanvas() {
    tablero.lineWidth = 8;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#E5E5E5";
    tablero.strokeStyle = "#8A3871";

    tablero.fillRect(0,0,1200,800);
    tablero.beginPath();
    tablero.moveTo(350,350);
    tablero.lineTo(650,350);
    tablero.stroke();
    tablero.closePath();
}

function paintLine() {
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#E5E5E5";
    tablero.strokeStyle = "#8A3871";

    let anchura = 700/palabraSecreta.length;
    
    for (let i = 0; i < palabraSecreta.length; i++) {
        tablero.moveTo(100 + (anchura * i), 450);
        tablero.lineTo(150 + (anchura * i), 450);
    }

    tablero.stroke();
    tablero.closePath();
}

function addWord() {
    let item1 = document.getElementById("first-btn");
    let item2 = document.getElementById("add-words");
    item1.style = "display: none";
    item2.style = "display: flex";
}

function saveWord() {
    let newWord = document.getElementById("new-word").value;
    if (validarTexto(newWord) && newWord!="" && newWord.length<=8) {
        palabras.push(newWord);
        document.getElementById("new-word").value = "";
        document.getElementById("add-words").style.display = "none";
        
        startGame();
        document.getElementById("warm").style = "color: black";
    } else {
        document.getElementById("warm").style = "color: red";
    }
}

function cancel() {
    let item1 = document.getElementById("first-btn");
    let item2 = document.getElementById("add-words");
    item1.style = "display: flex";
    item2.style = "display: none";
}

function surrender() {
    document.getElementById("show-canvas").style.display = "none";
    document.getElementById("first-section").style.display = "grid";
    document.getElementById("first-btn").style.display = "flex";
}

function pressLetter() {
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        
        console.log(keyName);

        let anchura = 700/palabraSecreta.length;

        tablero.beginPath(); //iniciar ruta
        tablero.fillStyle="#8A3871"; //color de relleno
        tablero.font="bold 45px Inter"; //estilo de texto

        for (const i in palabraSecreta) {
            if (keyName == palabraSecreta[i]) {
                tablero.fillText(palabraSecreta[i],108 + (anchura * i),430);
                cont +=1;
            } else if (keyName != palabraSecreta[i] && cont == 0 && !letrasErroneas.includes(keyName)) {
                letrasErroneas.push(keyName);
            }
        }

        for (const i in letrasErroneas) {
            if (keyName == letrasErroneas[i]) {
                errado += 50;
                tablero.font="35px Inter";
                tablero.fillText(keyName,errado,500);
            } 
        }

        console.log(letrasErroneas);
        cont = 0
        
    });
}

function validarTexto(texto) {
    var valor = /([^A-Z\ñ\s])/;
    if (valor.test(texto) === false) {
        return true;
    } else {
        return false;
    }
}