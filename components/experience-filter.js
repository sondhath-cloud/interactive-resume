// Interactive Experience Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryItems = document.querySelectorAll('.category-item');
    const cards = document.querySelectorAll('.accomplishment-card');
    const cardsContainer = document.querySelector('.cards-container');
    const emptyState = document.querySelector('.empty-state');

    // Initialize: show only the first category's cards
    const firstCategory = categoryItems[0]?.getAttribute('data-category');
    
    cards.forEach(card => {
        const cardCategories = card.getAttribute('data-category').split(' ');
        if (firstCategory && cardCategories.includes(firstCategory)) {
            card.classList.remove('hidden');
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
    
    // Hide empty state initially
    if (emptyState) {
        emptyState.style.display = 'none';
    }

    // Accordion functionality with improved filtering
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active category
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // First, fade out all cards
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
            });

            // After fade out, filter and show relevant cards
            setTimeout(() => {
                let visibleIndex = 0;
                
                cards.forEach((card, index) => {
                    const cardCategories = card.getAttribute('data-category').split(' ');
                    
                    if (cardCategories.includes(category)) {
                        // Show card
                        card.classList.remove('hidden');
                        card.style.display = 'flex';
                        
                        // Staggered fade-in animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                            card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                        }, visibleIndex * 60);
                        
                        visibleIndex++;
                    } else {
                        // Hide card
                        card.classList.add('hidden');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });

                // Show/hide empty state based on visible cards
                if (emptyState) {
                    if (visibleIndex === 0) {
                        emptyState.style.display = 'block';
                        cardsContainer.style.display = 'none';
                    } else {
                        emptyState.style.display = 'none';
                        cardsContainer.style.display = 'flex';
                    }
                }
            }, 200);
        });
    });

    // Add hover effect enhancement
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('hidden')) {
                this.style.transform = 'scale(1) translateY(0)';
            }
        });
    });

    // Add counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    const animateCounter = (element) => {
        const target = element.textContent.replace(/[^0-9]/g, '');
        const suffix = element.textContent.replace(/[0-9]/g, '');
        const duration = 2000;
        const increment = parseInt(target) / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < parseInt(target)) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateCounter(entry.target);
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add smooth scroll to cards when category is selected on mobile
    if (window.innerWidth <= 768) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                setTimeout(() => {
                    cardsContainer.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
            });
        });
    }

    // Keyboard navigation for accessibility
    categoryItems.forEach((item, index) => {
        // Make items keyboard focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-pressed', item.classList.contains('active'));

        // Handle keyboard events
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextItem = categoryItems[index + 1] || categoryItems[0];
                nextItem.focus();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevItem = categoryItems[index - 1] || categoryItems[categoryItems.length - 1];
                prevItem.focus();
            }
        });

        // Update aria-pressed when clicked
        item.addEventListener('click', function() {
            categoryItems.forEach(cat => cat.setAttribute('aria-pressed', 'false'));
            this.setAttribute('aria-pressed', 'true');
        });
    });

});

