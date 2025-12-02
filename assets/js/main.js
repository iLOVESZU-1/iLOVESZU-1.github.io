document.addEventListener('DOMContentLoaded', () => {
    const starfield = document.getElementById('starfield');
    const starsContainer = document.getElementById('stars');
    const constellationContainer = document.getElementById('constellation');

    if (!starfield || !starsContainer || !constellationContainer) return;

    const numStars = 150;
    const numConstellationStars = 15;
    const constellationStars = [];

    // Create stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }

    // Create constellation stars
    for (let i = 0; i < numConstellationStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2.5 + 1.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        const top = Math.random() * 80 + 10;
        const left = Math.random() * 80 + 10;
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.animationDuration = `3s`;
        star.style.animationDelay = `${Math.random()}s`;
        star.style.boxShadow = '0 0 5px #ffcc00';
        constellationContainer.appendChild(star);
        constellationStars.push({ x: left, y: top, element: star });
    }

    // Create constellation lines
    for (let i = 0; i < constellationStars.length; i++) {
        for (let j = i + 1; j < constellationStars.length; j++) {
            if (Math.random() > 0.85) { // Only connect some stars
                const p1 = constellationStars[i];
                const p2 = constellationStars[j];

                const line = document.createElement('div');
                line.classList.add('constellation-line');
                
                const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

                line.style.width = `${distance}%`;
                line.style.height = '1px';
                line.style.top = `${p1.y}%`;
                line.style.left = `${p1.x}%`;
                line.style.transform = `rotate(${angle}deg)`;
                
                constellationContainer.appendChild(line);
            }
        }
    }

    // Add rings for decoration
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        ring.classList.add('ring');
        const size = Math.random() * 200 + 100;
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        ring.style.top = `${Math.random() * 80 - 40}%`;
        ring.style.left = `${Math.random() * 80 - 40}%`;
        ring.style.animation = `twinkle ${Math.random() * 5 + 5}s linear infinite reverse`;
        constellationContainer.appendChild(ring);
    }
});
