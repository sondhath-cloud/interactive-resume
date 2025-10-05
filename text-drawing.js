// Text Drawing Component
class TextDrawing {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.context = null;
        this.position = {x: 0, y: 0};
        this.counter = 0;
        this.minFontSize = 3;
        this.angleDistortion = 0;
        this.mouse = {x: 0, y: 0, down: false};
        
        // Text content - professional resume related text
        this.letters = "Sondra Hathaway Organizational Developer Change Management Leadership Development Strategic Planning Team Building Process Improvement Quality Management Employee Engagement Digital Transformation Innovation Results Focused People Centric Scrappy Tech Savvy Just Do It Energy Adapting Trust Building Continuous Improvement Organizational Excellence";
        
        // Color palette matching resume theme
        this.colors = ["#27918F", "#90A998", "#549389", "#ED2A09"];
        this.colorIndex = 0;
        
        this.init();
    }
    
    init() {
        console.log('Initializing text drawing component...');
        
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'text-drawing-canvas';
        this.canvas.id = 'text-drawing-canvas';
        
        // Add canvas to container
        this.container.appendChild(this.canvas);
        console.log('Canvas added to container');
        
        // Get context
        this.context = this.canvas.getContext('2d');
        console.log('Canvas context obtained');
        
        // Set canvas size
        this.resizeCanvas();
        
        // Set initial background
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add event listeners
        this.addEventListeners();
        console.log('Event listeners added');
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
        
        console.log('Text drawing component initialized successfully');
    }
    
    resizeCanvas() {
        if (!this.canvas || !this.container) return;
        
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        console.log('Canvas resized to:', this.canvas.width, 'x', this.canvas.height);
        
        // Restore background after resize
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    addEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('mouseout', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('dblclick', (e) => this.handleDoubleClick(e));
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        }, false);
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        }, false);
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            this.canvas.dispatchEvent(mouseEvent);
        }, false);
    }
    
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = event.clientX - rect.left;
        this.mouse.y = event.clientY - rect.top;
        this.draw();
    }
    
    handleMouseDown(event) {
        console.log('Mouse down event triggered');
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.down = true;
        this.position.x = event.clientX - rect.left;
        this.position.y = event.clientY - rect.top;
        
        console.log('Mouse position:', this.position.x, this.position.y);
        
        // Hide info when drawing starts
        const info = document.querySelector('.text-drawing-info');
        if (info) {
            info.style.display = 'none';
        }
    }
    
    handleMouseUp(event) {
        this.mouse.down = false;
    }
    
    handleDoubleClick(event) {
        // Clear canvas and restore background
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Reset counter and color
        this.counter = 0;
        this.colorIndex = 0;
        
        // Show info again
        const info = document.querySelector('.text-drawing-info');
        if (info) {
            info.style.display = 'block';
        }
    }
    
    draw() {
        if (!this.mouse.down) return;
        
        const d = this.distance(this.position, this.mouse);
        const fontSize = this.minFontSize + d / 2;
        const letter = this.letters[this.counter];
        const stepSize = this.textWidth(letter, fontSize);
        
        if (d > stepSize) {
            const angle = Math.atan2(this.mouse.y - this.position.y, this.mouse.x - this.position.x);
            
            this.context.font = fontSize + "px Georgia";
            this.context.fillStyle = this.colors[this.colorIndex % this.colors.length];
            
            this.context.save();
            this.context.translate(this.position.x, this.position.y);
            this.context.rotate(angle);
            this.context.fillText(letter, 0, 0);
            this.context.restore();
            
            this.counter++;
            if (this.counter > this.letters.length - 1) {
                this.counter = 0;
                this.colorIndex++;
            }
            
            this.position.x = this.position.x + Math.cos(angle) * stepSize;
            this.position.y = this.position.y + Math.sin(angle) * stepSize;
        }
    }
    
    distance(pt, pt2) {
        const xs = pt2.x - pt.x;
        const ys = pt2.y - pt.y;
        return Math.sqrt(xs * xs + ys * ys);
    }
    
    textWidth(string, size) {
        this.context.font = size + "px Georgia";
        return this.context.measureText(string).width;
    }
    
    // Public method to clear the canvas
    clear() {
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.counter = 0;
        this.colorIndex = 0;
    }
}

// Initialize text drawing when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all styles are applied
    setTimeout(() => {
        // Check if text drawing container exists
        const textDrawingContainer = document.getElementById('text-drawing-container');
        if (textDrawingContainer) {
            console.log('Text drawing container found, initializing...');
            console.log('Container dimensions:', textDrawingContainer.offsetWidth, 'x', textDrawingContainer.offsetHeight);
            window.textDrawing = new TextDrawing('text-drawing-container');
        } else {
            console.log('Text drawing container not found');
        }
    }, 100);
});
