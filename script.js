// Add Segment
const addbtn = getElementById("addBtn");

addbtn.addEventListener("click", function () {
    const canvas = document.getElementById("circle");
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw existing segments.
    //If you want to add more segments, other ones decrease their size accordingly.
    for (let i = 0; i < segments.length; i++) {
        drawSegment(context, centerX, centerY, radius, i, segments.length);
    }
}

);