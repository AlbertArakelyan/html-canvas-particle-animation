const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
let hue = 0;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


canvas.addEventListener('click', (event) => {
  for (let i = 0; i < 250; i++) {
    particlesArray.push(new Particle(event.x, event.y));
  }
});

canvas.addEventListener('mousemove', (event) => {
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle(event.x, event.y));
  }
});

class Particle {
  constructor(x = Math.random() * canvas.width, y = Math.random() * canvas.height) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5; // (-1.5, 1.5)
    this.speedY = Math.random() * 3 - 1.5; // (-1.5, 1.5)
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}


function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        ctx.lineWidth = particlesArray[i].size / 10;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }

    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Trail effect
  // ctx.fillStyle = 'rgba(0,0,0,0.02)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  handleParticles();
  hue += 2;
  requestAnimationFrame(animate);
}

animate();