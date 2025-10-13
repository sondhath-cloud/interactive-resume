// Education Books Component - Isolated functionality
// This script handles only the education section books component to prevent interference with other instances

document.addEventListener('DOMContentLoaded', function() {
    // Education books component script loaded
    
    // Target both education books components
    const educationContainer = document.getElementById('books-component-container-education');
    const topEducationContainer = document.getElementById('books-component-container-top');
    
    // Initialize education section if it exists
    if (educationContainer) {
        // Initializing education section
        initEducationSection(educationContainer, 'edu-', 'default-open-book-education');
    }
    
    // Initialize top education section if it exists
    if (topEducationContainer) {
        // Initializing top education section
        initEducationSection(topEducationContainer, 'top-edu-', 'default-open-book-top');
    }
});

function initEducationSection(container, prefix, defaultBookId) {
    // Education-specific selectors
    const educationBooks = container.querySelectorAll('.books__hitbox');
    const educationSideBook = container.querySelector(`.side-book[data-book-index="${prefix}side"]`);
    const educationDescriptions = container.querySelectorAll('.book-description');
    const educationThemeToggle = container.querySelector('.education-theme-toggle');
    
    // Education-specific book titles and descriptions
    const educationBookData = {
        [`${prefix}0`]: {
            title: 'Arizona State University',
            description: 'Bachelor of Science in Psychology',
            detailText: 'Comprehensive study of human behavior, cognition, and mental processes. Developed strong analytical and research skills.'
        },
        [`${prefix}side`]: {
            title: prefix === 'edu-' ? 'Cultural Affairs' : 'Education',
            description: 'Master of Business Administration',
            detailText: 'Advanced business education focusing on leadership, strategy, and organizational development.'
        },
        [`${prefix}1`]: {
            title: 'Arizona State University',
            description: 'Master of Business Administration',
            detailText: 'Comprehensive business education with focus on strategic management, leadership development, and organizational transformation.'
        },
        [`${prefix}2`]: {
            title: 'University of Phoenix',
            description: 'Master of Business Administration',
            detailText: 'Advanced business education focusing on leadership, strategy, and organizational development.'
        },
        [`${prefix}3`]: {
            title: 'Prosci Certification',
            description: 'Change Management Professional',
            detailText: 'Certified in Prosci\'s ADKAR methodology for change management, enabling effective organizational transformation and change leadership.'
        },
        [`${prefix}4`]: {
            title: 'ICA Certification',
            description: 'International Coaching Academy',
            detailText: 'Professional coaching certification focused on leadership development, team dynamics, and organizational effectiveness.'
        },
        [`${prefix}5`]: {
            title: 'ASQ Certification',
            description: 'American Society for Quality',
            detailText: 'Quality management and process improvement certification demonstrating expertise in organizational excellence and continuous improvement methodologies.'
        }
    };

    // Initialize education books component
    function initEducationBooks() {
        // Show default description initially
        showEducationBookDescription('default');

        // Add click event listeners to education books only
        educationBooks.forEach(book => {
            book.addEventListener('click', function() {
                const bookIndex = this.getAttribute('data-book-index');
                showEducationBookDescription(bookIndex);
            });

        });

        // Add click event listener to education side book
        if (educationSideBook) {
            educationSideBook.addEventListener('click', function() {
                const bookIndex = this.getAttribute('data-book-index');
                showEducationBookDescription(bookIndex);
            });

        }

        // Add theme toggle for education
        if (educationThemeToggle) {
            educationThemeToggle.addEventListener('click', function() {
                toggleEducationTheme();
            });
        }
    }

    // Show education book description
    function showEducationBookDescription(bookIndex) {
        // Hide all education descriptions
        educationDescriptions.forEach(desc => {
            desc.classList.remove('active');
        });

        // Show selected education description
        const selectedDesc = container.querySelector(`.book-description[data-book-index="${bookIndex}"]`);
        if (selectedDesc) {
            selectedDesc.classList.add('active');
        }

    }

    // Toggle education theme
    function toggleEducationTheme() {
        container.classList.toggle('dark-mode');
    }


    // Initialize the education books component
    initEducationBooks();

    // Add responsive behavior
    function addResponsiveBehavior() {
        function adjustBooksForScreenSize() {
            const container = document.getElementById('books-component-container-top');
            if (!container) return;
            
            const booksWrapper = container.querySelector('.books-wrapper');
            const shelf = container.querySelector('.shelf');
            const bookShadows = container.querySelectorAll('.book-shadow__item');
            
            if (!booksWrapper || !shelf) return;
            
            const containerWidth = container.offsetWidth;
            const books = booksWrapper.querySelectorAll('.books__item, .side-book');
            const totalBooks = books.length;
            
            // Calculate if books need to be scaled down further
            const bookWidth = 88; // Base book width
            const sideBookWidth = 18; // Base side book width
            const gap = 16; // Base gap in pixels
            const sideBookCount = 1; // Number of side books
            const regularBookCount = totalBooks - sideBookCount;
            
            const totalWidth = (regularBookCount * bookWidth) + (sideBookCount * sideBookWidth) + ((totalBooks - 1) * gap);
            
            // If books don't fit, we need to scale them down
            if (totalWidth > containerWidth * 0.9) { // 90% of container width
                const scaleFactor = (containerWidth * 0.9) / totalWidth;
                
                // Apply scaling to books
                books.forEach(book => {
                    if (book.classList.contains('side-book')) {
                        book.style.transform = `scale(${scaleFactor})`;
                    } else {
                        book.style.transform = `scale(${scaleFactor})`;
                    }
                });
                
                // Scale the shelf
                shelf.style.transform = `scale(${scaleFactor})`;
                
                // Scale the shadows
                bookShadows.forEach(shadow => {
                    if (shadow.classList.contains('side')) {
                        shadow.style.transform = `scale(${scaleFactor})`;
                    } else {
                        shadow.style.transform = `scale(${scaleFactor})`;
                    }
                });
            } else {
                // Reset scaling if books fit
                books.forEach(book => {
                    book.style.transform = '';
                });
                shelf.style.transform = '';
                bookShadows.forEach(shadow => {
                    shadow.style.transform = '';
                });
            }
        }
        
        // Run on load and resize
        adjustBooksForScreenSize();
        window.addEventListener('resize', adjustBooksForScreenSize);
        
        // Also run when the container becomes visible (for lazy loading)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    adjustBooksForScreenSize();
                }
            });
        });
        
        const container = document.getElementById('books-component-container-top');
        if (container) {
            observer.observe(container);
        }
    }

    // Initialize responsive behavior
    addResponsiveBehavior();

    // Optional: Add some education-specific animations
    function addEducationAnimations() {
        // Add subtle hover effects for education books
        educationBooks.forEach(book => {
            book.addEventListener('mouseenter', function() {
                const bookCover = this.closest('.books__item').querySelector('.books__image');
                if (bookCover) {
                    bookCover.style.transform = 'perspective(1000px) rotateY(-10deg) translateZ(20px)';
                    bookCover.style.transition = 'transform 0.3s ease';
                }
            });

            book.addEventListener('mouseleave', function() {
                const bookCover = this.closest('.books__item').querySelector('.books__image');
                if (bookCover) {
                    bookCover.style.transform = 'perspective(1000px) rotateY(0deg) translateZ(0px)';
                }
            });
        });

        // Add hover effect for education side book
        if (educationSideBook) {
            educationSideBook.addEventListener('mouseenter', function() {
                this.style.transform = 'perspective(1000px) rotateY(-5deg) translateZ(10px)';
                this.style.transition = 'transform 0.3s ease';
            });

            educationSideBook.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateY(0deg) translateZ(0px)';
            });
        }
    }

    // Initialize education animations
    addEducationAnimations();
}
