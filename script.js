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
circle.style = "border: 2px solid black; border-radius: 50%; margin-right: 20px; background-color: lightgrey; ";

shapeDiv.appendChild(circle);
document.body.appendChild(shapeDiv);