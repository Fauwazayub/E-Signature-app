const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const undoButton = document.getElementById('undoButton');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const fontPicker = document.getElementById('fontPicker');
const textInput = document.getElementById('textInput');
const fontSizePicker = document.getElementById('fontSizePicker'); 
const retrieveButton = document.getElementById('retrieveButton');

const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
});

canvasColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, 800, 500);
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        lastX = event.offsetX;
        lastY = event.offsetY;
    }
});


canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});


canvas.addEventListener('touchstart',(event)=>{
    isDrawing(true);
    const touch = event.touches[0];
     lastX = touch.clientX - canvas.offsetLeft;
     lastY = touch.clientY - canvas.offsetTop;
     event.preventDefault();
})

canvas.addEventListener('touchmove',(event)=>{
    if(isDrawing){
        const touch = event.touches[0];
        const currentX = touch.clientX - canvas.offsetLeft;
        const currentY = touch.clientY - canvas.offsetTop;

        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        lastX = currentX;
        lastY = currentY;
        event.preventDefault();

    }
});

canvas.addEventListener('touchend',()=>{
    isDrawing = false;
})

fontSizePicker.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;
});

clearButton.addEventListener('click',(e)=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

saveButton.addEventListener('click',()=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-canvas.png';

    link.href=canvas.toDataURL();
    link.click();
});

retrieveButton.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvasContents')

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0);
    }
});
