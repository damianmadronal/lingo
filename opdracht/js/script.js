var main = document.body, body;
var itemsContainer, items;
var typingStart = false;
var onRow = 1, onColumn = 1;
var randomWord = wordPicker();
var mainWord;
var paraaf;
var key;
var music = new Audio('music.mp3');
var buttonSound = new Audio('button-sound.mp3');



function start(){
	init();
	keyListener();
	addFirstLetter();
}

start();

function init(){
	startButton.disabled = false;
	document.getElementById('quitButton').style.display = "inline";
	document.getElementById('startButton').style.display = "inline";
	document.getElementById('startButton').onclick = function(){
		startButton.disabled = true;
		music.play();
		music.loop = true;
		music.currentTime = 17;
		buttonSound.play();
		buttonSound.volume = 0.7;
		music.volume = 0.7;	
		typingStart = true;
	};
	document.getElementById('quitButton').onclick = function(){
		window.location.reload();
		start();
	}
	body = document.createElement("div");
	body.id = "body";
	main.appendChild(body);
	for(var a = 1; a < 6; a++){
		itemsContainer = document.createElement("div");
		itemsContainer.id = "row" + a;
		body.appendChild(itemsContainer);
		itemsContainer.style.textAlign = 'center';
		for(var b = 1; b < 6; b++){
			items = document.createElement("div");
			items.id = "column" + a + "." + b;
			itemsContainer.appendChild(items);
			items.style.height = '90px';
			items.style.width = '90px';
			items.style.background = 'white';
			items.style.display = 'inline-block';
			items.style.margin = '5px';
			items.style.borderRadius = '10px';
		}
	}
}

function keyListener(){
	document.addEventListener("keypress", function(e){
		key = String.fromCharCode(e.keyCode).toUpperCase();
		if(typingStart == true){
			addLetter(key, e.keyCode);
		}
	});
}

function addLetter(key, keyCode){
	if (keyCode == 13 && onColumn == 6){
		var word = "";
		for (var i = 0; i < 5; i++){
			var columnLetter = document.getElementById("column" + onRow + "." + (i+1)).firstChild.innerHTML;
			word += columnLetter;
		}
		check(word);
		onRow++;
		onColumn = 1;
	}
	if (onColumn <= 5 && keyCode != 13){
		var div = document.getElementById("column" + onRow + "." + onColumn);
		if(onColumn == 1 && onRow == 1){
			div.removeChild(firstletter);
		}
		paraaf = document.createElement("p");
		paraaf.firstChild = "p";
		div.appendChild(paraaf);
		paraaf.innerHTML = key;
		onColumn++;
	}
}

function wordPicker(){
	mainWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
}

function check(word){
	var mainWord2 = mainWord.split("");
	var myWord = word.split("");
	for(var c = 0; c <= 4; c++){
		var div = document.getElementById("column" + onRow + "." + (c+1));
			if(myWord[c] == mainWord2[c]){
				div.style.background = 'green';
				myWord[c] = "*";
				mainWord2[c] = " ";

			}
		}		
				if(myWord[0] == "*" && myWord[1] == "*" && myWord[2] == "*" && myWord[3] == "*" && myWord[4] == "*"){
					alert("Je hebt het woord goed geraden!");
					window.location.reload();
				}
				for(var q = 0; q <= 4; q++) {
					for(var g = 0; g <= 4; g++) {
						var div = document.getElementById("column" + onRow + "." + (q+1))
						if(myWord[q] == mainWord2[g]){
							div.style.background = 'yellow';
							div.style.borderRadius = '50px';
							myWord[q] = "*";
							mainWord2[g] = " ";
						}
					}
				}	
			}

function addFirstLetter(){
	var firstColumn = document.getElementById('column1.1');
	firstletter = document.createElement('p');
	firstletter.innerHTML = mainWord.charAt(0);
	firstColumn.appendChild(firstletter);
}