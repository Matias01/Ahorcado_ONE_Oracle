let palabras = ["TETRIS", "SONIC", "SNOWBROS", "WARCRAFT", "PACMAN"];
let tablero = document.getElementById("hanged").getContext("2d");
let palabraSecreta = "";
let errado = 100;
let letraMostrada = false;
let letrasErroneas = [];
let letrasUsadas = [];
let cont = 0;
let fin = false;

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

function restartGame() {
    surrender()
    startGame()
    letrasErroneas = [];
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
    errado = 100;
}

function pressLetter() {
    document.addEventListener('keydown', addLetter);
}

const addLetter = (event) => {
    let keyName = event.key;
        
    if (fin) {
            alert("Fin del Juego")
            cont = 0;
            keyName = ""
            letrasUsadas = []
            fin = false
            restartGame();
    }

    if (validarTexto(keyName) && !letrasUsadas.includes(keyName)) {
    
        let anchura = 700/palabraSecreta.length;

        tablero.beginPath(); //iniciar ruta
        tablero.fillStyle="#8A3871"; //color de relleno
        tablero.font="bold 45px Inter"; //estilo de texto

        for (const i in palabraSecreta) {
            if (keyName == palabraSecreta[i] && letrasErroneas.length<6) {
                tablero.fillText(palabraSecreta[i],108 + (anchura * i),430);
                cont +=1;
            } else if (!palabraSecreta.includes(keyName) && !letrasErroneas.includes(keyName) && i == palabraSecreta.length-1) {
                letrasErroneas.push(keyName);
                letraMostrada = false;
            } else if (letrasErroneas.length>=6) {
                alert("Fin del Juego")
                cont = 0;
                keyName = ""
                letrasUsadas = []
                fin = false
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
            tablero.fillText("Ganaste",550,60);
            fin = true;
        }

        letrasUsadas.push(keyName);
    }
}

function paintHanged(i) {
    
    tablero.beginPath();
    tablero.moveTo(400,350);
    
    switch (i) {
        case 1:
            // horca
            tablero.lineTo(400,70);
            tablero.lineTo(550,70);
            tablero.lineTo(550,80);
            
            // persona
            tablero.moveTo(585,115);
            tablero.arc(550, 115, 35, 0, 2 * Math.PI);
            break;
        case 2:
            tablero.moveTo(550,150);
            tablero.lineTo(550,250);
            break;
        case 3:
            tablero.moveTo(550,150);
            tablero.lineTo(500,175);
            break;
        case 4:
            tablero.moveTo(550,150);
            tablero.lineTo(600,175);
            break;
        case 5:
            tablero.moveTo(550,250);
            tablero.lineTo(500,275);
            break;
        case 6:
            tablero.moveTo(550,250);
            tablero.lineTo(600,275);
            tablero.fillText("Perdiste",660,60);
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