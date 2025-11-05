
const canvas = document.getElementById("circle");
const context = canvas.getContext("2d");
let isSpinning = false;
let currentRotationDeg = 0;
let accumulatedRotationDeg = 0;

if (!canvas.width || !canvas.height) {
  canvas.width = 400;
  canvas.height = 400;
}

const triangle = document.getElementById("MyCanvas");
const ctx = triangle.getContext("2d");
triangle.width = 120;
triangle.height = 120;

ctx.fillStyle = "red";

ctx.beginPath();
ctx.moveTo(triangle.width / 2, triangle.height); // Point at bottom
ctx.lineTo(0, 0); // Top left
ctx.lineTo(triangle.width, 0); // Top right
ctx.closePath();
ctx.fill();

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

  context.save();
  context.translate(centerX, centerY);
  context.rotate((accumulatedRotationDeg * Math.PI) / 180);
  context.translate(-centerX, -centerY);

  for (let i = 0; i < segments.length; i++) {
    const color = segment_colors[i % segment_colors.length];
    drawSegment(context, centerX, centerY, radius, i, segments.length, color, segments[i].label);
  }

  context.restore();
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

// Spin button functionality
const spinBtn = document.getElementById("spinbtn");
spinBtn.addEventListener("click", function() {
  if (isSpinning) return;
  
  if (segments.length === 0) {
    alert("Please add segments first!");
    return;
  }

  // Create snapshot of current wheel state
  const snapshot = document.createElement("canvas");
  snapshot.width = canvas.width;
  snapshot.height = canvas.height;
  const snapshotCtx = snapshot.getContext("2d");
  snapshotCtx.drawImage(canvas, 0, 0);

  isSpinning = true;

  const startTime = Date.now();
  const duration = 3000; // 3 seconds
  const totalRotationDeg = Math.random() * 360 + 360 * 5; // Random + 5 turns
  currentRotationDeg = 0;

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
    currentRotationDeg = eased * totalRotationDeg;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate((currentRotationDeg * Math.PI) / 180);
    context.translate(-canvas.width / 2, -canvas.height / 2);
    context.drawImage(snapshot, 0, 0);
    context.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      accumulatedRotationDeg = (accumulatedRotationDeg + totalRotationDeg) % 360;
      currentRotationDeg = 0;
      isSpinning = false;
      revealSelected();
    }
  };

  requestAnimationFrame(animate);
});
// Get selected segment index based on rotation
function getSelectedIndex() {
  const n = segments.length;
  if (n === 0) return -1;

  const step = 360 / n;
  const startOffset = -90;   // сегменты начинаются с 12 часов
  const pointerAngle = (() => {
    const wheelRect = canvas.getBoundingClientRect();
    const centerX = wheelRect.left + wheelRect.width / 2;
    const centerY = wheelRect.top + wheelRect.height / 2;

    const ptrRect = triangle.getBoundingClientRect();
    const tipX = ptrRect.left + ptrRect.width / 2;
    const tipY = ptrRect.bottom;

    const angleRad = Math.atan2(tipY - centerY, tipX - centerX);
    return ((angleRad * 180) / Math.PI + 360) % 360;
  })();

  // Нормализованный угол, учитывающий направление вращения (по часовой в canvas)
  const r = ((accumulatedRotationDeg % 360) + 360) % 360;

  // Угол луча указателя в системе колеса
  const a = ((pointerAngle - startOffset - r) % 360 + 360) % 360;

  const eps = 1e-6;          // защита от граничных случаев
  return Math.floor((a + eps) / step) % n;
}

// Reveal the selected segment
function revealSelected() {
  const idx = getSelectedIndex();
  if (idx < 0) return;
  
  const el = document.getElementById("pickedSegmentText");
  if (el) el.textContent = `You landed on: ${segments[idx].label}`;
  
  const modal = document.getElementById("PickedModal");
  if (modal) modal.classList.remove("hidden");
}

// Alternative function to pick segment
function pickSegment() {
  revealSelected();
}
// Close picked modal
function closeModal() {
  const modal = document.getElementById("PickedModal");
  if (modal) modal.classList.add("hidden");
}

const closeModalBtn = document.getElementById("pickedClose");
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

