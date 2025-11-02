
let addBtn = document.getElementById('addBtn');
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

let spinbtn = document.getElementById('spinbtn');
let isSpinning = false;

spinbtn.onclick = () => {
    if (isSpinning) return;
    
    const canvas = document.getElementById('circle');
    const ctx = canvas.getContext('2d');

    // Снимок текущего состояния колеса
    const snapshot = document.createElement('canvas');
    snapshot.width = canvas.width;
    snapshot.height = canvas.height;
    const sctx = snapshot.getContext('2d');
    sctx.drawImage(canvas, 0, 0);

    isSpinning = true;
    
    // Параметры анимации
    const startTime = Date.now();
    const duration = 3000; // 3 секунды
    const totalRotation = 360 * 5 + Math.random() * 360; // 5 оборотов + случайный угол
    let currentRotation = 0;

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing функция (ease-out cubic) для плавного замедления
        const eased = 1 - Math.pow(1 - progress, 3);
        
        currentRotation = totalRotation * eased;

        // Отрисовка
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((currentRotation * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        ctx.drawImage(snapshot, 0, 0);
        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            // Здесь можно определить выигрышный сектор
            const finalAngle = currentRotation % 360;
            console.log('Остановилось на угле:', finalAngle);
        }
    };

    requestAnimationFrame(animate);
};
