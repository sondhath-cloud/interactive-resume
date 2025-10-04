// Blog Slider Component - Resume Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the blog slider for resume
    if (document.querySelector('.resume-blog-slider')) {
        var resumeBlogSwiper = new Swiper('.resume-blog-slider', {
            spaceBetween: 30,
            effect: 'fade',
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            mousewheel: {
                invert: false,
            },
            pagination: {
                el: '.resume-blog-slider__pagination',
                clickable: true,
            },
            // Responsive breakpoints
            breakpoints: {
                320: {
                    spaceBetween: 20,
                },
                768: {
                    spaceBetween: 30,
                },
                1024: {
                    spaceBetween: 40,
                }
            }
        });

        // Pause autoplay on hover for better UX
        const sliderContainer = document.querySelector('.resume-blog-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', function() {
                resumeBlogSwiper.autoplay.stop();
            });
            
            sliderContainer.addEventListener('mouseleave', function() {
                resumeBlogSwiper.autoplay.start();
            });
        }
    }
});
