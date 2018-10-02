var mainWrapper = document.createElement('div');
mainWrapper.style.height = '646px';
mainWrapper.style.width = '512px';
// mainWrapper.style.margin = '0 auto';
mainWrapper.style.overflow = 'hidden';
mainWrapper.style.position = 'relative';
document.body.appendChild(mainWrapper);

var innerWrapper;
function mainInnerWrapper() {
    this.innerWrapper = document.createElement('div');
    this.innerWrapper.style.height = '740px';
    this.innerWrapper.style.width = '512px';
    this.innerWrapper.style.backgroundImage = "url('images/road.png')";
    this.innerWrapper.style.position = 'absolute';
    mainWrapper.appendChild(this.innerWrapper);

    // this.updateInnerWrapper = function() {

    // }
}

function createCar(background) {
    this.carImage = document.createElement('div');
    this.carImage.style.height = '151px';
    this.carImage.style.width = '70px';
    this.carImage.style.position = 'absolute';
    // carImage.style.backgroundColor = 'blue';
    this.carImage.style.backgroundImage = "url('images/car.png')";
    this.carImage.style.top = '460px';
    this.carImage.style.left = '220px';
    background.innerWrapper.appendChild(this.carImage);
    this.carPositionUpdate = function(position) {
        switch (position) {
            case 0:
                this.carImage.style.left = '142px';
                break;

            case 1:
                this.carImage.style.left = '220px';
                break;

            case 2:
                this.carImage.style.left = '300px';
                break;
        }
    }
}

var createBackground = new mainInnerWrapper();
var myCar = new createCar(createBackground);
var arrowKeyCount = 0;

function KeyPressed(index) {
    arrowKeyCount += index;
    if (arrowKeyCount < 0) {
        arrowKeyCount = 0;
    }
    if (arrowKeyCount > 2) {
        arrowKeyCount = 2;
    }

    myCar.carPositionUpdate(arrowKeyCount);
    console.log(arrowKeyCount);
}

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



