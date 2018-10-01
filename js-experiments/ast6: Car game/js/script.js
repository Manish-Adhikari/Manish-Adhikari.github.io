var mainWrapper = document.createElement('div');
mainWrapper.style.height = '646px';
mainWrapper.style.width = '400px';
mainWrapper.style.backgroundColor = '#395D33';
mainWrapper.style.margin = '0 auto';
mainWrapper.style.position = 'relative';
document.body.appendChild(mainWrapper);

var mainWrapperInner = document.createElement('div');
mainWrapperInner.style.height = '100%';
mainWrapperInner.style.width = '300px';
mainWrapperInner.style.backgroundColor = '#9b7653';
mainWrapperInner.style.margin = '0 auto';
mainWrapperInner.style.position = 'relative';
mainWrapper.appendChild(mainWrapperInner);

function createCar() {
    this.carImage = document.createElement('div');
    this.carImage.style.height = '151px';
    this.carImage.style.width = '70px';
    this.carImage.style.position = 'absolute';
    // carImage.style.backgroundColor = 'blue';
    this.carImage.style.backgroundImage = "url('images/car.png')";
    this.carImage.style.top = '460px';
    this.carImage.style.left = '0px';
    mainWrapperInner.appendChild(this.carImage);
    this.carPositionUpdate = function(position) {
        switch (position) {
            case 0:
                this.carImage.style.left = '0px';
                break;

            case 1:
                this.carImage.style.left = '70px';
                break;

            case 2:
                this.carImage.style.left = '160px';
                break;

            case 3:
                this.carImage.style.left = '230px';
                break;
        }
    }
}

function createlaneDivider(position1, position2) {
    this.laneDivider = document.createElement('div');
    this.laneDivider.style.height = '150px';
    this.laneDivider.style.width = '20px';
    this.laneDivider.style.backgroundColor = 'white';
    this.laneDivider.style.position = 'absolute';
    this.laneDivider.style.left = position1 + 'px';
    this.laneDivider.style.top = position2 + 'px';
    mainWrapperInner.appendChild(this.laneDivider);
}

function createObstacles(bRadius,obsColor) {
	this.obstacle = document.createElement('div');
	this.obstacle.style.height = '70px';
	this.obstacle.style.width = '70px';
	this.obstacle.style.backgroundColor = obsColor;
	this.obstacle.style.borderRadius = bRadius;
	this.obstacle.style.position = 'absolute';
	mainWrapperInner.appendChild(this.obstacle);  
	that = this;

	this.generateRandomPositions = function() {
		this.indexLeft = Math.floor(Math.random()*4 + 0);
		switch (this.indexLeft) {
            case 0:
                this.obstacle.style.left = '0px';
                break;

            case 1:
                this.obstacle.style.left = '70px';
                break;

            case 2:
                this.obstacle.style.left = '160px';
                break;

            case 3:
                this.obstacle.style.left = '230px';
                break;
        }
	}

	this.obstaclePositionUpdate = function() {
	 	var i = 0;
	 	var obstacleInterval = setInterval(function(){
	 		i += 10;
	 		that.obstacle.style.top = i + 'px';

	 		if (i > 570) {
	 			clearInterval(obstacleInterval);
	 			mainWrapperInner.removeChild(that.obstacle);
	 		}
	 	},20);


	}
}


var laneArray = [];
var laneTopPosition = [20, 240, 460];
var laneLeftPosition = 140;
for (var i = 0; i < 3; i++) {
    laneArray.push(createlaneDivider(laneLeftPosition, laneTopPosition[i]));
}

var myCar = new createCar();
var arrowKeyCount = 0;

document.addEventListener("keydown", function(event) {
    var position = event.which;
    switch (position) {
        case 39:
            KeyPressed(1);
            break;

        case 37:
            KeyPressed(-1);
            break;
    }
});


function KeyPressed(index) {
    arrowKeyCount += index;
    if (arrowKeyCount < 0) {
        arrowKeyCount = 0;
    }
    if (arrowKeyCount > 3) {
        arrowKeyCount = 3;
    }

    myCar.carPositionUpdate(arrowKeyCount);
    console.log(arrowKeyCount);
}

// function checkCollision(myCar,obs) {
//   	if(my)
// }

var obs = [];
setInterval(function() {
	for(var i = 0; i < 1; i++){
		obs.push(new createObstacles('50%', 'lightblue'));
	}
    obs.forEach(function(obstacle) {
        obstacle.generateRandomPositions();
        // checkCollision(myCar,obs[i]);
    	obstacle.obstaclePositionUpdate();
    });
    
},1500);