const canvas = document.getElementById("circle");
const context = canvas.getContext("2d");

if (!canvas.width || !canvas.height) {
  canvas.width = 400;
  canvas.height = 400;
}

const segments = [];
const segment_colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6", "#e67e22"];

function drawSegment(ctx, centerX, centerY, radius, index, total, color, label) {
  const startAngle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const endAngle = ((index + 1) / total) * Math.PI * 2 - Math.PI / 2;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw label
  const midAngle = (startAngle + endAngle) / 2;
  const textX = centerX + (radius * 0.6) * Math.cos(midAngle);
  const textY = centerY + (radius * 0.6) * Math.sin(midAngle);
  
  ctx.fillStyle = "#ffffff";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, textX, textY);
}

function redrawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;

  context.clearRect(0, 0, canvas.width, canvas.height);

  if (segments.length === 0) return;

  for (let i = 0; i < segments.length; i++) {
    const color = segment_colors[i % segment_colors.length];
    drawSegment(context, centerX, centerY, radius, i, segments.length, color, segments[i].label);
  }
}

// Add Segment
const addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function () {
  segments.push({ label: `Segment ${segments.length + 1}` });
  redrawWheel();
});

// Modal functionality
const modal = document.getElementById("nameModal");
const nameBtn = document.getElementById("nameBtn");
const closeBtn = document.getElementById("nameClose");
const saveNamesBtn = document.getElementById("saveNamesBtn");
const segmentNamesDiv = document.getElementById("segmentNames");

// Open modal and generate inputs
nameBtn.addEventListener("click", function () {
  if (segments.length === 0) {
    alert("Please add segments first!");
    return;
  }
  
  // Clear previous inputs
  segmentNamesDiv.innerHTML = "";
  
  // Create input for each segment
  for (let i = 0; i < segments.length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "segmentNameInput";
    input.placeholder = `Name for Segment ${i + 1}`;
    input.value = segments[i].label;
    input.dataset.index = i;
    segmentNamesDiv.appendChild(input);
  }
  
  modal.classList.remove("hidden");
});

// Close modal
closeBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
});

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

// Save names
saveNamesBtn.addEventListener("click", function () {
  const inputs = segmentNamesDiv.querySelectorAll(".segmentNameInput");
  
  inputs.forEach((input) => {
    const index = parseInt(input.dataset.index);
    const newName = input.value.trim();
    
    if (newName) {
      segments[index].label = newName;
    }
  });
  
  redrawWheel();
  modal.classList.add("hidden");
});