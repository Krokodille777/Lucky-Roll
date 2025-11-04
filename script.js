// ...existing code...

// Персистентное состояние
const canvas = document.getElementById("circle");
const context = canvas.getContext("2d");

// Убедитесь, что у canvas заданы атрибуты width/height (через HTML или тут)
if (!canvas.width || !canvas.height) {
  canvas.width = 400;
  canvas.height = 400;
}

const segments = []; // сохраняется между кликами
const segment_colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6", "#e67e22"];

function drawSegment(ctx, centerX, centerY, radius, index, total, color) {
  const startAngle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const endAngle = ((index + 1) / total) * Math.PI * 2 - Math.PI / 2;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  // границы сегмента
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function redrawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;

  context.clearRect(0, 0, canvas.width, canvas.height);

  if (segments.length === 0) return;

  for (let i = 0; i < segments.length; i++) {
    const color = segment_colors[i % segment_colors.length];
    drawSegment(context, centerX, centerY, radius, i, segments.length, color);
  }
}

// Add Segment
const addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function () {
  // добавляем новый сегмент
  segments.push({ label: `Segment ${segments.length + 1}` });
  // перерисовываем колесо
  redrawWheel();
});

function name_segments() {
    const namebtn = document.getElementById("nameBtn");
    namebtn.addEventListener("click", function () {
        const segmentnames = document.getElementById("segmentNames").value.split(",");
        for (let i = 0; i < segments.length; i++) {
            if (segmentnames[i]) {
                segments[i].label = segmentnames[i].trim();
            }
        }
        // перерисовываем колесо
        redrawWheel();
    });
}
// ...existing code...