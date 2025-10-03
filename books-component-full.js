// Books Component JavaScript for Full Width Container
document.addEventListener("DOMContentLoaded", () => {
  // Get the books container
  const booksContainer = document.getElementById("books-component-container-full");
  
  if (!booksContainer) return;

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle-full");
  let isDarkTheme = false;

  themeToggle.addEventListener("click", () => {
    isDarkTheme = !isDarkTheme;
    booksContainer.classList.toggle("dark-theme", isDarkTheme);
    
    // Update theme toggle appearance
    themeToggle.style.backgroundColor = isDarkTheme ? "#fff" : "#333";
    themeToggle.style.color = isDarkTheme ? "#333" : "#fff";
  });

  // Get the overlay elements
  const overlay = booksContainer.querySelector(".book-title-overlay");
  const overlayText = booksContainer.querySelector(".book-title-text");

  // Track the currently active book
  let activeBookIndex = 2; // Start with the University of Phoenix book (index 2)
  let activeBookTimeline = null;

  // Apply hover animations to each book item
  const books = booksContainer.querySelectorAll(".books__item");
  const bookTimelines = [];

  books.forEach((book, index) => {
    const hitbox = book.querySelector(".books__hitbox");
    const bookTitle = hitbox.getAttribute("data-book-title");

    // Create timeline for this book - simple hover effect only
    const timeline = gsap.timeline({ paused: true });

    // Simple hover animation - just lift the book slightly
    timeline.to(book, {
      y: -10,
      duration: 0.3,
      ease: "power2.out"
    });

    bookTimelines.push(timeline);

    // Add hover event listener
    hitbox.addEventListener("mouseenter", () => {
      // If there's an active book that's different from this one, reset it
      if (activeBookIndex !== index && activeBookTimeline) {
        activeBookTimeline.reverse();
      }

      // Set this book as active
      activeBookIndex = index;
      activeBookTimeline = timeline;

      // Play this book's animation
      timeline.play();

      // Update the overlay text
      overlayText.textContent = bookTitle;
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3
      });

      // Update the description
      updateDescription(index.toString());
    });

    // Add mouse leave event listener
    hitbox.addEventListener("mouseleave", () => {
      // Only reset if this is the currently active book
      if (activeBookIndex === index) {
        timeline.reverse();
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      }
    });
  });

  // Handle side book hover
  const sideBook = booksContainer.querySelector(".side-book");
  if (sideBook) {
    // Create simple hover timeline for side book
    const sideBookTimeline = gsap.timeline({ paused: true });
    sideBookTimeline.to(sideBook, {
      y: -10,
      duration: 0.3,
      ease: "power2.out"
    });

    sideBook.addEventListener("mouseenter", () => {
      // If there's an active book, reset it
      if (activeBookTimeline) {
        activeBookTimeline.reverse();
      }

      // Set side book as active
      activeBookIndex = "side";
      activeBookTimeline = sideBookTimeline;

      // Play side book hover animation
      sideBookTimeline.play();

      // Show the side book title in the overlay
      const sideBookTitle = sideBook.getAttribute("data-book-title");
      overlayText.textContent = sideBookTitle;
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3
      });

      // Update the description
      updateDescription("side");
    });

    sideBook.addEventListener("mouseleave", () => {
      // Reset side book animation
      if (activeBookIndex === "side") {
        sideBookTimeline.reverse();
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      }
    });
  }

  // Function to update book description
  function updateDescription(bookIndex) {
    const descriptions = booksContainer.querySelectorAll(".book-description");
    
    descriptions.forEach((desc, index) => {
      if (desc.getAttribute("data-book-index") === bookIndex) {
        desc.classList.add("active");
        
        // Animate the text
        const lines = desc.querySelectorAll(".line");
        if (lines.length > 0) {
          gsap.fromTo(
            lines,
            {
              y: 20,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out"
            }
          );
        }
      } else {
        desc.classList.remove("active");
      }
    });
  }

  // Set the default open book (University of Phoenix)
  const defaultBook = books[2];
  const defaultBookTitle = defaultBook
    .querySelector(".books__hitbox")
    .getAttribute("data-book-title");

  // Set the default book as active
  activeBookIndex = 2;
  activeBookTimeline = bookTimelines[2];

  // Show the default book title (no animation on load)
  overlayText.textContent = defaultBookTitle;
  gsap.to(overlay, {
    opacity: 1,
    duration: 0.3
  });

  // Handle mouse leaving the entire shelf area
  document
    .querySelector(".shelf-container")
    .addEventListener("mouseleave", () => {
      // Return to the default book when mouse leaves the shelf area

      // If the active book is not the default book, reset it
      if (activeBookIndex !== 2 && activeBookTimeline) {
        activeBookTimeline.reverse();
      }

      // Set the default book as active again
      activeBookIndex = 2;
      activeBookTimeline = bookTimelines[2];

      // Show the default book title in the overlay (no animation)
      overlayText.textContent = defaultBookTitle;
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3
      });

      // Update the description to show the default book's description
      updateDescription("2");
    });

  // Initialize Split Type for all descriptions
  const descriptions = booksContainer.querySelectorAll(".book-description");

  // Process each description
  descriptions.forEach((description) => {
    const textElement = description.querySelector("p");
    if (textElement) {
      // Split the text into lines
      const split = new SplitType(textElement, {
        types: "lines",
        lineClass: "line"
      });

      // Set initial state for lines
      gsap.set(split.lines, {
        y: 20,
        opacity: 0
      });
    }
  });

  // Show the default description
  updateDescription("2");
});
