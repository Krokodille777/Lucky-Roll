let header = document.createElement("div");
header.className = "header";
header.innerText = "Welcome to Lucky Roll!";
header.style ="text-align: center; font-size: 24px; font-weight: bold; margin-top: 20px;";
document.body.appendChild(header);

let hr1 = document.createElement("hr");
document.body.appendChild(hr1);

let shapeDiv = document.createElement("div");
shapeDiv.className = "shape-div";
shapeDiv.style = "display: flex; justify-content: center; align-items: center; margin-top: 70px;";


let circle = document.createElement("canvas");
circle.id = 'circle';
circle.width = 600;
circle.height = 600;
circle.style = "border: 2px solid black; border-radius: 50%; margin-right: 20px; background-color: lightgrey; color: white; ";

shapeDiv.appendChild(circle);
document.body.appendChild(shapeDiv);
addBtn = document.createElement("button");
addBtn.id = "addBtn";
addBtn.innerText = "Set the Wheel Segments";
addBtn.style = "padding: 10px 20px; font-size: 16px; cursor: pointer;";
addBtn.onclick = function(){
    let n = prompt("Enter number of segments to add:");
    n = parseInt(n);
    let fontcolor = prompt("Enter font color for segment names (e.g., black, #FFFFFF):");
    
    const canvas = document.getElementById('circle');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const anglePerSegment = (2 * Math.PI) / n;
    
    for(let i = 0; i < n; i++){
        let segmentName = prompt("Enter segment name:");
        let segmentColor = prompt("Enter segment color (e.g., red, #00FF00):");
        
        const startAngle = i * anglePerSegment;
        const endAngle = startAngle + anglePerSegment;
        
        // Рисуем сегмент
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = segmentColor || `hsl(${(i * 360) / n}, 100%, 50%)`;
        ctx.strokeStyle = 'black';
        ctx.fill();
        ctx.stroke();
        
        // Рисуем текст на сегменте
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + anglePerSegment / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = fontcolor || "black";
        ctx.font = "20px Arial";
        ctx.fillText(segmentName, radius * 0.6, 0);
        ctx.restore();
    }
}
document.body.appendChild(addBtn);
