var currentRoom = "start";
var commands = ["ir a", "agarrar", "inventario", "mirar"];
var inventory = ["sword", "shield"];

/*
function typeWriter() {
    if (i < txt.length) {
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

function changeRoom(dir) {
    if (rooms[currentRoom].directions[dir] !== undefined) {
        currentRoom = rooms[currentRoom].directions[dir]
        $('#game-text').append("<p>" + rooms[currentRoom].description + "</p>");
    } else {
        $('#game-text').append("<p>no puedes ir ahi!</p>");
    }
}
*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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");
        snd.play();
}

async function changeRoom(dir) {
    var i = 0;
    if (rooms[currentRoom].directions[dir] !== undefined) {
        currentRoom = rooms[currentRoom].directions[dir]
        texto = rooms[currentRoom].description;
        $('#game-text').append("<p>");
        while (i < texto.length) {
            $('#game-text').append(texto[i]);
            i++;
            await sleep(50)
        }
        $('#game-text').append("</p>");
        i = 0;
        $('#game-text').append("<p>" + "funciona. valor de i: " + i + "</p>");
    } else {
        $('#game-text').append("<p>no puedes ir ahi!</p>");
    }
}


function lookRoom(mirar) {
    if (rooms[currentRoom].vistas[mirar] !== undefined) {
        $('#game-text').append("<p>" + rooms[currentRoom].vistas[mirar] + "</p>");
    } else {
        $('#game-text').append("<p>Eso no te parece una buena idea</p>");
    }
}

function showHelp() {
    $('#game-text').append("<p>Estos son los posibles comandos: </p>");
    $('#game-text').append("<p><ul>");
    for (var i = 0; i < commands.length; i++) {
        $('#game-text').append("<li>" + commands[i] + "</li>");
    }
    $('#game-text').append("</ul></p>");

}

function showInventory() {
    if (inventory.length === 0) {
        $('#game-text').append("<p>No llevas nada encima!</p>");
        return;
    }
    $('#game-text').append("<p>Inventario actual: </p>");
    $('#game-text').append("<p><ul>");
    for (var i = 0; i < inventory.length; i++) {
        $('#game-text').append("<li>" + inventory[i] + "</li>");
    }
    $('#game-text').append("</ul></p>");

}

function playerInput(input) {
    var command = input.split(" ")[0];
    switch (command) {
        case "ir":
            var c2 = input.split(" ")[1];
            if(c2 ==="a"){
                var dir = input.split(" ")[2];
                changeRoom(dir);
            } else {
                $('#game-text').append("<p>El comando debe ser IR A</p>");
            }
            break;
       case "mirar":
            var mir = input.split(" ")[1];
            lookRoom(mir);
            break;
        case "ayuda":
            showHelp();
            break;
        case "inventario":
            showInventory();
            break;

        default:
            $('#game-text').append("<p>Invalid command!</p>");
    }
}

$(document).ready(function() {
    $('#game-text').append("<p>" + rooms.start.description + "</p>");

    $(document).keypress(function(key) {
        if (key.which === 13 && $('#user-input').is(':focus')) {
            var value = $('#user-input').val().toLowerCase();
            $('#user-input').val("");
            playerInput(value);
        }
    })


})
