# Resume Synchronization System Guide

## Overview
Your resume now has an automatic synchronization system that keeps your printable resume (`resume.html`) in sync with your web resume (`index.html`). When you update content on your web resume, the printable version automatically pulls those changes!

## How It Works

### 1. Data Attributes
Both files use `data-print` attributes to mark content that should sync between versions:

```html
<!-- In index.html (Web Resume) -->
<h4 class="job-title" data-print="job-1-title">Senior Organizational Developer</h4>

<!-- In resume.html (Printable Resume) -->
<h3 class="job-title" data-print="job-1-title">Senior Organizational Developer</h3>
```

When `resume.html` loads, it fetches `index.html` and copies content from matching `data-print` attributes.

### 2. Synced Content
The following content automatically syncs:

**Contact Information:**
- `data-print="name"` - Your name
- `data-print="contact-website"` - Website
- `data-print="contact-phone"` - Phone number
- `data-print="contact-email"` - Email address
- `data-print="contact-address"` - Location

**Profile:**
- `data-print="title"` - Professional title
- `data-print="profile-text"` - About/profile statement

**Professional Experience (Jobs 1-5):**
- `data-print="job-1"` through `data-print="job-5"` - Complete job entries
- `data-print="job-X-title"` - Job title
- `data-print="job-X-dates"` - Employment dates
- `data-print="job-X-company"` - Company name
- `data-print="job-X-summary"` - Job summary
- `data-print="job-X-accomplishments"` - Accomplishments list

**Technical Skills:**
- `data-print="technical-skills"` - Skills section

## How to Use

### Updating Your Resume

1. **Make changes to your web resume** (`index.html`)
   - Edit any content within elements that have `data-print` attributes
   - The printable version will automatically pull these changes

2. **View the printable version** (`resume.html`)
   - Open `resume.html` in your browser
   - The content will automatically sync from `index.html` on page load
   - Double-click the print button to manually refresh content

3. **Print or Save as PDF**
   - Click the print button
   - Save as PDF for distribution

### Manual Sync
If you need to manually refresh the content:
1. Open `resume.html` in your browser
2. **Double-click** the print button (not single-click)
3. You'll see a confirmation that content was refreshed

## Adding New Synced Content

To add new content that syncs between versions:

1. **Add the data attribute to `index.html`:**
   ```html
   <p data-print="new-content-key">Your new content here</p>
   ```

2. **Add the matching attribute to `resume.html`:**
   ```html
   <p data-print="new-content-key">Placeholder text</p>
   ```

3. When `resume.html` loads, it will automatically pull the content from `index.html`

## Benefits

✅ **Single Source of Truth** - `index.html` is your master resume  
✅ **No Duplication** - Update content once, it appears in both versions  
✅ **Automatic Sync** - Printable version stays current automatically  
✅ **Different Layouts** - Each version can have its own styling and layout  
✅ **Easy Maintenance** - Just update your web resume and you're done!

## Technical Details

The sync happens via JavaScript when `resume.html` loads:
1. Fetches `index.html` content
2. Parses the HTML
3. Finds all elements with `data-print` attributes
4. Copies content from web version to printable version
5. Console logs success or error messages

## Troubleshooting

**Content not updating?**
- Make sure both files have matching `data-print` attribute values
- Check browser console for error messages
- Try double-clicking the print button to manually refresh

**Different styling between versions?**
- This is expected! Each file has its own CSS
- Only the *content* syncs, not the *styling*

**Serving locally:**
- The sync works when files are served via HTTP (like with `python3 -m http.server 8000`)
- May not work when opening files directly (file://) due to browser security

## Files Modified

- `index.html` - Added `data-print` attributes to all resume content
- `resume.html` - Added sync script and `data-print` attributes
- This guide - Documents the system for future reference

