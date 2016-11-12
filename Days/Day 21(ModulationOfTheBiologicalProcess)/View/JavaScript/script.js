var canvas = document.getElementById("canvas");// получаем элемент canvas
var context = canvas.getContext("2d");// получаем холст для рисования

canvas.width = 960;// ширина холста
canvas.height = 480;// высота холста

var ROWS = 10;// количество строк карты
var COLS = 20;// количество столбцов карты


var BackMap;// карта
var Actors = {};// волки, зайцы

var numberRabbits = 0;// общее количество зайцев
var numberVolfs = 0;// общее количество волков
var numberCreatures = 0;// общее количество животных

window.onload = function() {
    init.world();// генерируем мир
    gameLoop();
    //gameLoop();// запускаем главный цикл игры
}


window.onclick = function gameLoop() {
    id = setInterval(function () {

    var activeActors = {};

    for(var actor in Actors) {
        if(Actors[actor] != null) {
            activeActors[actor] = Actors[actor];
        }
    }

    for(var actor in activeActors) {
            //console.log(actor);
            Actors[actor].searchFood();
            moveTo(Actors[actor], Actors[actor].stepToFood());
    }
    activeActors = {};
},1500);
}

function moveTo(actor, dir) {
    var newKey = (actor.x + dir.x) + "_" + (actor.y + dir.y);// новый ключ для сравнения

    if(/*Actors[newKey] != null*/ 0) {// если произошла атака
        var victim = Actors[newKey];// кого начили бить

        if(actor.name == "Rabbit") {

        } else if(actor.name == "Volf") {

        }
    } else {// если это передвижени или заяц ест траву
        if(newKey == (actor.x + "_" + actor.y)) {// если заяц съел траву
            if(BackMap[actor.y][actor.x] == 2) {
                actor.hungry = 0;// он теперь не голодный
                actor.inLove = 1;// может размножаться
    			BackMap[actor.y][actor.x] = 1;// убираем траву с карты
                draw.place(actor.x, actor.y);// рисуем клетку карты
    			draw.actor(actor);// рисуем зайца
            }
		} else {// если это передвижение
            Actors[(actor.x + dir.x) + "_" + (actor.y + dir.y)] = actor;// создаем новове расположение
            Actors[actor.x + "_" + actor.y] = null;// удаляем старое расположение
            draw.step(actor, dir);// анимация перехода в другую клетку
            actor.x = actor.x + dir.x;
            actor.y = actor.y + dir.y;
        }
    }
}

var anim;
var count = 0;

var requestAF = (function() {
	return requestAnimationFrame       ||
		   webkitRequestAnimationFrame ||
		   mozRequestAnimationFrame    ||
		   oRequestAnimationFrame      ||
		   msRequestAnimationFrame     ||
		   function(callback) {
			   setTimeout(callback, 1000 / 60);
		   };
})();

var setAnimation = function(callback) {
	anim = callback;
};

var animationStep = function() {
	anim();
	requestAF(animationStep);
};

var animationStart = function(callback) {
	anim = callback;
	animationStep();
};

function space() {}
