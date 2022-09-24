let palabras = ["TETRIS", "SONIC", "SNOWBROS", "WARCRAFT", "PACMAN"];
let tablero = document.getElementById("hanged").getContext("2d");
let palabraSecreta = "";
let letraMostrada = false;
let fin = false;
let letrasErroneas = [];
let letrasUsadas = [];
let errado = 200;
let cont = 0;

function chooseSecretWord() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabra;
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

function restartGame() {
    surrender()
    startGame()
}

function paintCanvas() {
    tablero.lineWidth = 8;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#E5E5E5";
    tablero.strokeStyle = "#8A3871";

    tablero.fillRect(0,0,1200,800);
    tablero.beginPath();
    tablero.moveTo(450,350);
    tablero.lineTo(750,350);
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
        tablero.moveTo(200 + (anchura * i), 450);
        tablero.lineTo(250 + (anchura * i), 450);
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
    document.getElementById("new-word").value = "";
    let item1 = document.getElementById("first-btn");
    let item2 = document.getElementById("add-words");
    item1.style = "display: flex";
    item2.style = "display: none";
}

function surrender() {

    removeEvent()

    document.getElementById("show-canvas").style.display = "none";
    document.getElementById("first-section").style.display = "grid";
    document.getElementById("first-btn").style.display = "flex";

    letraMostrada = false;
    errado = 200;
    letrasErroneas = [];
    cont = 0;
    letrasUsadas = []
    fin = false
}

function pressLetter() {
    document.addEventListener('keydown', addLetter);
}

const addLetter = (event) => {
    let keyName = event.key;
        
    if (fin) {
            alert("Fin del Juego")
            keyName = ""
            restartGame();
    }

    if (validarTexto(keyName) && !letrasUsadas.includes(keyName)) {
    
        let anchura = 700/palabraSecreta.length;

        tablero.beginPath(); //iniciar ruta
        tablero.fillStyle="#8A3871"; //color de relleno
        tablero.font="bold 45px Inter"; //estilo de texto

        for (const i in palabraSecreta) {
            if (keyName == palabraSecreta[i] && letrasErroneas.length<6) {
                tablero.fillText(palabraSecreta[i],208 + (anchura * i),430);
                cont +=1;
            } else if (!palabraSecreta.includes(keyName) && !letrasErroneas.includes(keyName) && i == palabraSecreta.length-1) {
                letrasErroneas.push(keyName);
                letraMostrada = false;
            } else if (letrasErroneas.length>=6) {
                alert("Fin del Juego")
                keyName = ""
                restartGame();
            }
        }

        for (const i in letrasErroneas) {
            if (keyName == letrasErroneas[i] && letraMostrada == false) {
                errado += 50;
                tablero.font="35px Inter";
                tablero.fillText(keyName,errado,500);
                letraMostrada = true
                paintHanged(parseInt(i)+1)
            }
        }

        if (palabraSecreta.length == cont) {
            tablero.fillText("Ganaste",650,60);
            fin = true;
        }

        letrasUsadas.push(keyName);
    }
}

function paintHanged(i) {
    
    tablero.beginPath();
    tablero.moveTo(500,350);
    
    switch (i) {
        case 1:
            // horca
            tablero.lineTo(500,70);
            tablero.lineTo(650,70);
            tablero.lineTo(650,80);
            
            // persona
            tablero.moveTo(685,115);
            tablero.arc(650, 115, 35, 0, 2 * Math.PI);
            break;
        case 2:
            tablero.moveTo(650,150);
            tablero.lineTo(650,250);
            break;
        case 3:
            tablero.moveTo(650,150);
            tablero.lineTo(600,175);
            break;
        case 4:
            tablero.moveTo(650,150);
            tablero.lineTo(700,175);
            break;
        case 5:
            tablero.moveTo(650,250);
            tablero.lineTo(600,275);
            break;
        case 6:
            tablero.moveTo(650,250);
            tablero.lineTo(700,275);
            tablero.fillText("Perdiste",760,60);
            break;
    }

    tablero.stroke();
    tablero.closePath();
    
}

function removeEvent() {
   document.removeEventListener('keydown', addLetter)
}

function validarTexto(texto) {
    var valor = /([^A-Z])/;
    if (valor.test(texto) === false) {
        return true;
    } else {
        return false;
    }
}