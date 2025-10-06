console.log('=== SIMPLE REFRACTED BALL SCRIPT LOADING ===');
console.log('Script loaded at:', new Date().toISOString());

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing simple refracted ball...');
    
    const container = document.getElementById("refracted-ball-container");
    if (container) {
        console.log('Container found:', container);
        
        // Create a simple canvas-based refracted ball effect
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.borderRadius = '8px';
        
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);
        
        // Simple animated ball with gradient effect
        let time = 0;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create gradient background
            const gradient = ctx.createRadialGradient(
                canvas.width/2 + Math.sin(time) * 50, 
                canvas.height/2 + Math.cos(time) * 50, 
                0,
                canvas.width/2, 
                canvas.height/2, 
                150
            );
            
            gradient.addColorStop(0, 'rgba(255, 100, 150, 0.8)');
            gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.6)');
            gradient.addColorStop(1, 'rgba(50, 50, 100, 0.4)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add some animated circles for refraction effect
            for (let i = 0; i < 5; i++) {
                const x = canvas.width/2 + Math.sin(time + i) * (80 + i * 20);
                const y = canvas.height/2 + Math.cos(time + i) * (60 + i * 15);
                const radius = 20 + Math.sin(time * 2 + i) * 10;
                
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time + i) * 0.2})`;
                ctx.fill();
            }
            
            time += 0.02;
            requestAnimationFrame(animate);
        }
        
        animate();
        console.log('Simple refracted ball initialized successfully');
    } else {
        console.error('Refracted ball container not found');
    }
});

// Pattern switching function
let currentPattern = 1;
window.switchPattern = function(patternNumber) {
    console.log('Pattern switched to:', patternNumber);
    currentPattern = patternNumber;
    
    // Update button styles
    document.querySelectorAll('.pattern-btn').forEach((btn, index) => {
        if (index + 1 === patternNumber) {
            btn.style.backgroundColor = 'var(--salmon)';
        } else {
            btn.style.backgroundColor = 'transparent';
        }
    });
};
