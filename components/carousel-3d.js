// 3D Card Carousel Component

const carousel3dCards = document.querySelectorAll(".carousel-3d-card");
const carousel3dDots = document.querySelectorAll(".carousel-3d-dot");
const carousel3dLeftArrow = document.querySelector(".carousel-3d-nav-arrow.left");
const carousel3dRightArrow = document.querySelector(".carousel-3d-nav-arrow.right");
const carousel3dTrack = document.querySelector(".carousel-3d-track");
let carousel3dCurrentIndex = 0;
let carousel3dIsAnimating = false;

// Touch/swipe support
let startX = 0;
let startY = 0;
let isTouchDevice = 'ontouchstart' in window;

function updateCarousel3d(newIndex) {
    if (carousel3dIsAnimating) return;
    carousel3dIsAnimating = true;

    carousel3dCurrentIndex = (newIndex + carousel3dCards.length) % carousel3dCards.length;

    carousel3dCards.forEach((card, i) => {
        const offset = (i - carousel3dCurrentIndex + carousel3dCards.length) % carousel3dCards.length;

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
        } else if (offset === carousel3dCards.length - 1) {
            card.classList.add("left-1");
        } else if (offset === carousel3dCards.length - 2) {
            card.classList.add("left-2");
        } else {
            card.classList.add("hidden");
        }
    });

    carousel3dDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === carousel3dCurrentIndex);
    });

    setTimeout(() => {
        carousel3dIsAnimating = false;
    }, 800);
}

if (carousel3dLeftArrow) {
    carousel3dLeftArrow.addEventListener("click", () => {
        updateCarousel3d(carousel3dCurrentIndex - 1);
    });
}

if (carousel3dRightArrow) {
    carousel3dRightArrow.addEventListener("click", () => {
        updateCarousel3d(carousel3dCurrentIndex + 1);
    });
}

carousel3dDots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        updateCarousel3d(i);
    });
});

carousel3dCards.forEach((card, i) => {
    card.addEventListener("click", () => {
        updateCarousel3d(i);
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        updateCarousel3d(carousel3dCurrentIndex - 1);
    } else if (e.key === "ArrowRight") {
        updateCarousel3d(carousel3dCurrentIndex + 1);
    }
});

let carousel3dTouchStartX = 0;
let carousel3dTouchEndX = 0;

document.addEventListener("touchstart", (e) => {
    carousel3dTouchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
    carousel3dTouchEndX = e.changedTouches[0].screenX;
    handleCarousel3dSwipe();
});

function handleCarousel3dSwipe() {
    const swipeThreshold = 50;
    const diff = carousel3dTouchStartX - carousel3dTouchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            updateCarousel3d(carousel3dCurrentIndex + 1);
        } else {
            updateCarousel3d(carousel3dCurrentIndex - 1);
        }
    }
}

// Initialize carousel
if (carousel3dCards.length > 0) {
    updateCarousel3d(0);
}

