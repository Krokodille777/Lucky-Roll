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
circle.style = "border: 2px solid black; border-radius: 50%; margin-right: 20px; background-color: lightgrey;  ";

shapeDiv.appendChild(circle);
document.body.appendChild(shapeDiv);
addBtn = document.createElement("button");
addBtn.id = "addBtn";
addBtn.innerText = "Add Segment";
addBtn.style = "padding: 10px 20px; font-size: 16px; cursor: pointer;";
addBtn.onclick = function(){
    alert("Add Segment button clicked!");
    let segmentName = prompt("Enter segment name:");
    if(segmentName){
        alert("Segment '" + segmentName + "' added!");
    }
    let segmentColor = prompt("Enter segment color (e.g., red, #00FF00):");
    if(segmentColor){
        alert("Segment color set to '" + segmentColor + "'!");
    }
    let newSegment = document.createElement("div");
    newSegment.innerText = segmentName || "Unnamed Segment";
    newSegment.style = "width: 100px; height: 30px; background-color: " + (segmentColor || "grey") + "; margin: 5px; text-align: center; line-height: 30px; color: white;";
    shapeDiv.appendChild(newSegment);
}
document.body.appendChild(addBtn);