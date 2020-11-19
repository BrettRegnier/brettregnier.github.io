var resize_timeout = 0;
const canvas = document.getElementById("nn");
const ctx = canvas.getContext("2d");

function resize_canvas()
{
    canvas.width = window.innerWidth-17;
    canvas.height = window.innerHeight-50;
        
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
}

window.addEventListener("resize", function(){
    clearTimeout(resize_timeout);
    resize_timeout = setTimeout(function() {
        resize_canvas();
    }, 200);
});