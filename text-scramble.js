class TextScramble {
    constructor(element) {
        this.element = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.resolve = null;
        this.queue = [];
        this.frame = 0;
        this.frameRequest = null;
        
        this.phrases = [
            'ORGANIZATIONAL DEVELOPER',
            'ARTIST',
            'CHANGE MANAGEMENT PRACTITIONER',
            'DRUMMER',
            'STRATEGIC PLANNER',
            'LIFELONG LEARNER',
            'PROCESS IMPROVER',
        ];
        
        this.currentPhraseIndex = 0;
        this.isScrambling = false;
        
        this.init();
    }
    
    init() {
        this.setText(this.phrases[0]);
        this.startScrambling();
    }
    
    setText(newText) {
        const oldText = this.element.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.element.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(() => this.update());
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
    
    startScrambling() {
        if (this.isScrambling) return;
        
        this.isScrambling = true;
        this.scrambleLoop();
    }
    
    scrambleLoop() {
        if (!this.isScrambling) return;
        
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        this.setText(currentPhrase).then(() => {
            // Wait a bit before moving to next phrase
            setTimeout(() => {
                this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
                this.scrambleLoop();
            }, 2000);
        });
    }
    
    stop() {
        this.isScrambling = false;
        cancelAnimationFrame(this.frameRequest);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const scrambleElement = document.getElementById('scramble-text');
    if (scrambleElement) {
        window.textScramble = new TextScramble(scrambleElement);
    }
});
