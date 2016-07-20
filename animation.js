window.onload= function() {
    var swiftComputerImage = new Image();
    swiftComputerImage.src = "./blog-animation.png";
    var image = swiftComputerImage;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');

    function Sprite (options) {
        var frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = ticksPerFrame || 0, 
            context = options.context,
        
        animation = {
            loop: true,
            width: options.width,
            height: options.height,
            image: options.image,
            context: options.context,
            numberOfFrames: options.numberOfFrames,
            update: function (){
                tickCount +=1;

                if (tickCount > ticksPerFrame) {
                    tickCount =0;

                    if (frameIndex < animation.numberOfFrames - 1) {
                        frameIndex +=1;
                    } else if (animation.loop) {
                        frameIndex = 0;
                    }
                }
            },

            render: function () {
                animation.context.clearRect(0, 0, canvas.width, canvas.height);

                animation.context.drawImage(animation.image, (frameIndex*animation.width), 0, animation.width, animation.height, 75, 75, animation.width, animation.height);
            }
        };    

        return animation;
    }

    var swiftComputer = Sprite({
        context: ctx,
        width: 288,
        height: 315,
        image: image,
        numberOfFrames: 4,
        ticksPerFrame: 17
    });

    function loopyLoop(){
        setTimeout(function(){

            window.requestAnimationFrame(loopyLoop);

            swiftComputer.update();
            swiftComputer.render();
        }, 70);
    }

    swiftComputerImage.addEventListener("load", loopyLoop);
};