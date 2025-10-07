# Project Structure

This document describes the organization of the Graphic Resume project.

## Directory Structure

### Root Files
- **index.html** - Main resume webpage (primary file)
- **styles.css** - Main stylesheet for the resume
- **Sondra Hathaway Resume v1.pdf** - PDF version of resume

### `/assets/` - Static Assets
All images, logos, and backgrounds used throughout the site.

#### `/assets/images/`
- Profile photos and headshots

#### `/assets/logos/`
- **asq logo.png** - ASQ Certification logo
- **asu1.png, asu2.png** - Arizona State University logos
- **ica2.png** - ICA Certification logo
- **peak.png** - Peak Academy/Lean Six Sigma logo
- **prosci-logo.svg** - Prosci Certification logo
- **uop.png** - University of Phoenix logo
- **wildcard.png** - Wildcard/input management icon

#### `/assets/backgrounds/`
- **pattern1.png - pattern4.png** - Refracted ball background patterns
- **technological-bg.jpg** - Background for technology-related cards

### `/components/` - Reusable Components
JavaScript and CSS files for interactive components.

- **books-component.js** - 3D animated books for education/certifications
- **books-component.css** - Styling for books component
- **education-books-component.js** - Specific implementation for education section
- **education-books-isolated.css** - Isolated styles for education books
- **blog-slider-resume.js** - Card slider for experience items
- **blog-slider-resume.css** - Styling for blog slider
- **refracted-ball.js** - Interactive 3D refracted sphere effect
- **text-drawing.js** - Interactive text drawing canvas
- **text-drawing.css** - Styling for text drawing
- **text-scramble.js** - Text scrambling animation effect

### `/libs/` - External Libraries
Third-party JavaScript libraries.

- **three.min.js** - Three.js library for 3D graphics
- **three-r180.min.js** - Specific version of Three.js
- **OrbitControls.js** - Three.js orbit controls

### `/docs/` - Documentation
Project documentation files.

- **SYNC-SETUP-COMPLETE.md** - Documentation about content sync setup
- **PROJECT-STRUCTURE.md** - This file

### `/archive/` - Archived/Unused Files
Old versions, experimental features, and reference implementations.

- **books-component-full.js** - Alternative full-width books component
- **experience-popup.js** - Experimental experience popup (unused)
- **simple-refracted-ball.js** - Simplified version of refracted ball
- **test-refracted-ball.js** - Test version of refracted ball
- **update-printable-resume.html** - Old printable resume updater
- **card1.jpeg - card5.png** - Card slider images (used by archived swiper)
- **README.md** - Original images readme
- **card-effect-swiper-js/** - Reference implementation for card effect
- **text-scramble-effect/** - Reference implementation for text scramble

## File Dependencies

### Main Page (index.html) Dependencies:

**CSS Files:**
1. styles.css
2. components/books-component.css
3. components/education-books-isolated.css
4. components/blog-slider-resume.css
5. components/text-drawing.css

**JavaScript Files:**
1. components/books-component.js
2. components/education-books-component.js
3. components/blog-slider-resume.js
4. components/text-drawing.js
5. components/text-scramble.js
6. libs/three.min.js
7. components/refracted-ball.js

**Image Assets:**
- All logos in `/assets/logos/` for education/certification books
- All patterns in `/assets/backgrounds/` for interactive sphere
- Profile image in `/assets/images/`

## Maintenance Notes

- **Active Files**: Only files in root, `/assets/`, `/components/`, `/libs/`, and `/docs/` are actively used
- **Archive**: Files in `/archive/` are kept for reference but not loaded by the main application
- **Path Updates**: All file paths have been updated to reflect the new organization
- **No Breaking Changes**: All references have been updated to maintain functionality

## Version History

**v1.0 (October 2025)** - Initial organization
- Created logical folder structure
- Moved assets to dedicated folders
- Separated components from main files
- Archived unused/experimental code
- Updated all file references

