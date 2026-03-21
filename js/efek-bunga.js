// Efek Taburan Bunga dari Atas ke Bawah
// Emoji Bunga: 💗🌸🌺🌹🌻💐🍁🍀🌷

const flowers = ['💗', '🌸', '🌺', '🌹', '🌻', '💐', '🍁', '🍀', '🌷'];

class Flower {
  constructor(x, y) {
    this.element = document.createElement('div');
    this.element.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    this.element.style.position = 'fixed';
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
    this.element.style.fontSize = (Math.random() * 20 + 15) + 'px';
    this.element.style.pointerEvents = 'none';
    this.element.style.zIndex = '9999';
    this.element.style.opacity = '1';
    this.element.style.userSelect = 'none';
    
    document.body.appendChild(this.element);
    
    this.x = x;
    this.y = y;
    this.velocityX = (Math.random() - 0.5) * 3;
    this.velocityY = Math.random() * 2 + 1.5;
    this.opacity = 1;
    this.lifetime = 0;
    this.maxLifetime = 180;
  }
  
  update() {
    this.lifetime++;
    this.x += this.velocityX + Math.sin(this.lifetime * 0.05) * 0.5; // Sedikit gerakan bergelombang
    this.y += this.velocityY;
    this.opacity = Math.max(0, 1 - (this.lifetime / this.maxLifetime));
    
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.opacity = this.opacity;
  }
  
  isAlive() {
    return this.lifetime < this.maxLifetime && this.y < window.innerHeight + 100;
  }
  
  remove() {
    this.element.remove();
  }
}

let flowers_array = [];

// Membuat bunga secara otomatis dari atas
function createFlower() {
  const x = Math.random() * window.innerWidth;
  const y = -50;
  flowers_array.push(new Flower(x, y));
}

// Generate bunga setiap interval waktu
setInterval(createFlower, 300);

// Animation loop
function animate() {
  flowers_array.forEach((flower, index) => {
    flower.update();
    if (!flower.isAlive()) {
      flower.remove();
      flowers_array.splice(index, 1);
    }
  });
  
  requestAnimationFrame(animate);
}

animate();
