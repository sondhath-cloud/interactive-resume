# Blog Slider Images Folder

## How to Add Your Own Images

### Step 1: Add Your Images Here
Simply drag and drop your image files into this `images` folder.

### Step 2: Recommended Image Specifications
- **Format**: JPG, PNG, or WebP
- **Size**: 800x600 pixels or larger (the slider auto-scales)
- **Aspect Ratio**: Landscape orientation works best (4:3 or 16:9 ratio)

### Step 3: Name Your Images
Use these exact filenames for each card position:

1. `card1.jpg` (or .png) - Technology/Business theme
2. `card2.jpg` (or .png) - Nature/Travel theme  
3. `card3.jpg` (or .png) - Food/Restaurant theme
4. `card4.jpg` (or .png) - Architecture/Design theme
5. `card5.jpg` (or .png) - Lifestyle/Office theme
6. `card6.jpg` (or .png) - Travel/Vacation theme

### Step 4: Update the HTML File
After adding your images, you'll need to update the image sources in `index.html` to point to your local images instead of the online URLs.

**Example change needed:**
```html
<!-- Change from: -->
<img src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Technology workspace">

<!-- To: -->
<img src="./images/card1.jpg" alt="Technology workspace">
```

### Current Card Themes
- **Card 1**: Technology/Remote Work
- **Card 2**: Nature/Sustainable Travel  
- **Card 3**: Food/Pizza Making
- **Card 4**: Architecture/Urban Design
- **Card 5**: Lifestyle/Home Office
- **Card 6**: Travel/Southeast Asia

Once you've added your images, let me know and I can help update the HTML file to use your local images instead of the online ones!
