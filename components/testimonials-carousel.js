// Testimonials Carousel Component - 3D Card Style

(function() {
    'use strict';

    // Testimonials data
    const testimonials = [
        {
            title: "Personable",
            text: "Outstanding. Very professional yet personable. Very articulate when training and thorough in her approach. She came on board when we terminated our relationship with a change manager who was not working out. The change was a great decision because Sondra did such a wonderful job and was a pleasure to work with.",
            name: "Michael Barnhart",
            company: "Yamhill County, Oregon"
        },
        {
            title: "Positive",
            text: "Sondra was onsite a fair amount and I appreciated being able to talk to her in person about the project. I felt like she always had the team's back and supported us in any way we needed. She is very positive and gives encouraging feedback.",
            name: "Carol Miller",
            company: "Louisville, KY"
        },
        {
            title: "Perseverant",
            text: "I tend to act on the assumption that, after a couple of initial attempts, those who do not support a large project like this can be left behind. It's their choice. Sondra was always trying to get everyone together up and down the organization. Her attitude was to never give up on anyone or leave anyone behind. That was a welcome mindset to have on the team.",
            name: "David Holland",
            company: "Louisville-Jefferson County Metro Government"
        },
        {
            title: "Collaborative",
            text: "Amazing! Very insightful and informative. Willing to go beyond the surface and dig deep to find the true reasons for resistance to change. Great brainstorming conversations, very collaborative. Felt like she was one of our teammates. Good. She did a great job working on a complex project that changed a lot.",
            name: "Kristina",
            company: "Louisville Metro Government"
        },
        {
            title: "Focused",
            text: "Sondra was excellent to work with, always focused on project goals and their impact on front-line workers. Every aspect of her performance, from scheduling to communication to strategic planning was tremendous.",
            name: "David Holland",
            company: "Louisville Metro Government"
        },
        {
            title: "Timely",
            text: "It was wonderful! I worked with Sondra on the organizational change management committee (OCM). She led the OCM project team and coordinated the OCM liaisons. She was very organized and an excellent project manager. Sondra is an excellent communicator and leader. She coordinated the training for both UKG and Workday transitions, facilitated OCM liaison meetings to work through pain points, spearheaded the FAQs and job aid development, put together communications for the enterprise in preparation for the transition.",
            name: "Carol Miller",
            company: "Louisville Metro Government"
        },
        {
            title: "Authentic",
            text: "Sondra and I worked together for about two years, during that time she provided me with the tools and resources I needed to support my growth. She was instrumental in establishing internal and external Organizational Change Management services. Most importantly, she's authentic, professional and really cares about her team and the clients she serves.",
            name: "Anonymous",
            company: "Metro Government"
        },
        {
            title: "Professional",
            text: "Amazing. Sondra was timely, professional, and always willing to guide us through the process and principals of change management. Not only did it improve project outcomes, but positively impacted organizational culture within our team.",
            name: "Kristen Wolbach",
            company: "City of Amarillo"
        },
        {
            title: "Effective",
            text: "Good. She did a great job working on a complex project that changed a lot.",
            name: "Anonymous",
            company: ""
        },
        {
            title: "Supportive",
            text: "I remember when I first started working I was experiencing different emotions about my abilities and how'd I make it in this new job. Sondra reminded me of my value to my team and organization.",
            name: "Anonymous",
            company: ""
        }
    ];

    // Initialize the testimonials carousel
    function initTestimonialsCarousel() {
        const container = document.getElementById('testimonials-container');
        if (!container) {
            console.warn('Testimonials container not found');
            return;
        }

        // Build the HTML structure
        const html = `
            <div class="testimonials-carousel-section">
                <h2 class="testimonials-title">TESTIMONIALS</h2>
                
                <div class="carousel-container">
                    <button class="nav-arrow left">‹</button>
                    <div class="carousel-track">
                        ${testimonials.map((testimonial, index) => `
                            <div class="testimonial-card" data-index="${index}">
                                <div class="card-content">
                                    <h3 class="testimonial-title">${testimonial.title}</h3>
                                    <p class="testimonial-text">${testimonial.text}</p>
                                    <div class="testimonial-attribution">
                                        <div class="testimonial-name">${testimonial.name}</div>
                                        <div class="testimonial-company">${testimonial.company}</div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="nav-arrow right">›</button>
                </div>

                <div class="testimonial-info">
                    <h2 class="testimonial-name-display">${testimonials[0].name}</h2>
                    <p class="testimonial-company-display">${testimonials[0].company}</p>
                </div>

                <div class="dots">
                    ${testimonials.map((_, index) => `
                        <div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                    `).join('')}
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Initialize carousel functionality
        initCarouselFunctionality();
    }

    function initCarouselFunctionality() {
        const cards = document.querySelectorAll(".testimonial-card");
        const dots = document.querySelectorAll(".dot");
        const testimonialName = document.querySelector(".testimonial-name-display");
        const testimonialCompany = document.querySelector(".testimonial-company-display");
        const leftArrow = document.querySelector(".nav-arrow.left");
        const rightArrow = document.querySelector(".nav-arrow.right");
        let currentIndex = 0;
        let isAnimating = false;

        function updateCarousel(newIndex) {
            if (isAnimating) return;
            isAnimating = true;

            currentIndex = (newIndex + cards.length) % cards.length;

            cards.forEach((card, i) => {
                const offset = (i - currentIndex + cards.length) % cards.length;

                card.classList.remove(
                    "center",
                    "left-1",
                    "left-2",
                    "right-1",
                    "right-2",
                    "hidden"
                );

                if (offset === 0) {
                    card.classList.add("center");
                } else if (offset === 1) {
                    card.classList.add("right-1");
                } else if (offset === 2) {
                    card.classList.add("right-2");
                } else if (offset === cards.length - 1) {
                    card.classList.add("left-1");
                } else if (offset === cards.length - 2) {
                    card.classList.add("left-2");
                } else {
                    card.classList.add("hidden");
                }
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });

            testimonialName.style.opacity = "0";
            testimonialCompany.style.opacity = "0";

            setTimeout(() => {
                testimonialName.textContent = testimonials[currentIndex].name;
                testimonialCompany.textContent = testimonials[currentIndex].company;
                testimonialName.style.opacity = "1";
                testimonialCompany.style.opacity = "1";
            }, 300);

            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }

        leftArrow.addEventListener("click", () => {
            updateCarousel(currentIndex - 1);
        });

        rightArrow.addEventListener("click", () => {
            updateCarousel(currentIndex + 1);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                updateCarousel(i);
            });
        });

        cards.forEach((card, i) => {
            card.addEventListener("click", () => {
                updateCarousel(i);
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                updateCarousel(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
                updateCarousel(currentIndex + 1);
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    updateCarousel(currentIndex + 1);
                } else {
                    updateCarousel(currentIndex - 1);
                }
            }
        }

        updateCarousel(0);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);
    } else {
        initTestimonialsCarousel();
    }

})();
