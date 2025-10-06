console.log('=== TEST REFRACTED BALL SCRIPT LOADING ===');
console.log('Script file loaded at:', new Date().toISOString());

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, looking for container...');
    
    const container = document.getElementById("refracted-ball-container");
    if (container) {
        console.log('Container found:', container);
        console.log('Container dimensions:', container.offsetWidth, 'x', container.offsetHeight);
        
        // Add a simple test element
        const testDiv = document.createElement('div');
        testDiv.style.width = '100%';
        testDiv.style.height = '100%';
        testDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        testDiv.style.border = '2px solid red';
        testDiv.innerHTML = '<p style="color: white; text-align: center; margin-top: 50%;">TEST REFRACTED BALL CONTAINER</p>';
        container.appendChild(testDiv);
        
        console.log('Test element added to container');
    } else {
        console.error('Refracted ball container not found');
    }
});

// Test switchPattern function
window.switchPattern = function(patternNumber) {
    console.log('switchPattern called with:', patternNumber);
    alert('Pattern ' + patternNumber + ' selected!');
};
