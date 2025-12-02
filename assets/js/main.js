document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('universe-canvas');
    if(!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    const starLayers = [
        { count: 150, speed: 0.05, size: 1, color: '#8a8a96' },
        { count: 70, speed: 0.1, size: 1.5, color: '#b0b0c0' },
        { count: 30, speed: 0.2, size: 2, color: '#fdf6e3' }
    ];

    const stars = [];

    function initStars() {
        stars.length = 0;
        starLayers.forEach(layer => {
            for(let i=0; i<layer.count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * layer.size + 0.5,
                    baseSpeed: layer.speed,
                    speed: layer.speed * (Math.random() * 0.5 + 0.8),
                    color: layer.color,
                    opacity: Math.random() * 0.5 + 0.3,
                    pulse: Math.random() * 0.02
                });
            }
        });
    }

    function animate() {
        ctx.fillStyle = 'rgba(5, 5, 8, 0.2)'; 
        ctx.fillRect(0, 0, width, height);

        stars.forEach(star => {
            star.x -= star.speed;
            if (star.x < 0) {
                star.x = width;
                star.y = Math.random() * height;
            }
            star.opacity += star.pulse;
            if (star.opacity > 0.8 || star.opacity < 0.2) star.pulse *= -1;

            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.opacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    initStars();
    animate();
});
