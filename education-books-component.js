// Education Books Component - Isolated functionality
// This script handles only the education section books component to prevent interference with other instances

document.addEventListener('DOMContentLoaded', function() {
    // Target both education books components
    const educationContainer = document.getElementById('books-component-container-education');
    const topEducationContainer = document.getElementById('books-component-container-top');
    
    // Initialize education section if it exists
    if (educationContainer) {
        initEducationSection(educationContainer, 'edu-', 'default-open-book-education');
    }
    
    // Initialize top education section if it exists
    if (topEducationContainer) {
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
            description: 'Bachelor of Science in Psychology'
        },
        [`${prefix}side`]: {
            title: prefix === 'edu-' ? 'Cultural Affairs' : 'Education',
            description: 'Master of Business Administration'
        },
        [`${prefix}1`]: {
            title: 'Arizona State University',
            description: 'Master of Business Administration'
        },
        [`${prefix}2`]: {
            title: 'University of Phoenix',
            description: 'Master of Business Administration'
        },
        [`${prefix}3`]: {
            title: 'Prosci Certification',
            description: 'Change Management Professional'
        },
        [`${prefix}4`]: {
            title: 'ICA Certification',
            description: 'International Coaching Academy'
        },
        [`${prefix}5`]: {
            title: 'ASQ Certification',
            description: 'American Society for Quality'
        }
    };

    // Initialize education books component
    function initEducationBooks() {
        // Set default open book for education
        const defaultBook = container.querySelector(`#${defaultBookId}`);
        if (defaultBook) {
            const bookIndex = defaultBook.querySelector('.books__hitbox').getAttribute('data-book-index');
            showEducationBookDescription(bookIndex);
        }

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

        // Update education title overlay
        const titleOverlay = container.querySelector('.book-title-text');
        if (titleOverlay && educationBookData[bookIndex]) {
            titleOverlay.textContent = educationBookData[bookIndex].title;
        }
    }

    // Toggle education theme
    function toggleEducationTheme() {
        container.classList.toggle('dark-mode');
    }

    // Initialize the education books component
    initEducationBooks();

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
