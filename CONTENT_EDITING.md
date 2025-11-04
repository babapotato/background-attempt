# Content Editing Guide

This guide explains how to edit the portfolio content without modifying code directly.

## Quick Start

1. **Access the Admin Interface**: Navigate to `/admin` on your website (e.g., `https://yourusername.github.io/background-attempt/admin`)

2. **Edit Content**: Use the form fields to edit:
   - Hero section text
   - Gallery items (images and titles)
   - About section (image and text)
   - Contact links (email, phone, Instagram, LinkedIn)

3. **Preview Changes**: 
   - Click "Save to Browser" to save changes to your browser's localStorage
   - Changes will be visible immediately on the main page (refresh if needed)
   - Note: These changes are only visible in your browser

4. **Make Changes Permanent**:
   - Click "Export JSON" to download the updated content file
   - Replace `content/portfolio-content.json` in your repository with the exported file
   - Commit and push the changes to update the live site

## How It Works

### Browser Preview (Temporary)
- Changes saved to browser localStorage are visible immediately
- Only visible to you on your device
- Lost when you clear browser data

### Permanent Changes
- Export the JSON file from the admin interface
- Replace the file in the repository
- Commit and push to GitHub
- Changes will be live on the website after deployment

## Image URLs

For images, you can use:
- **URLs to hosted images**: Any publicly accessible image URL
- **Image hosting services**: 
  - [Imgur](https://imgur.com) - Upload images and use the direct link
  - [Cloudinary](https://cloudinary.com) - Free tier available
  - [Unsplash](https://unsplash.com) - Free stock photos with direct links

### Adding Images to Gallery
1. Upload your image to an image hosting service
2. Copy the direct image URL
3. In the admin interface, paste the URL in the "Image URL" field
4. Add a title for the image
5. Click "Save to Browser" to preview
6. Export and commit when ready

## For Your Colleague

Share the admin link with your colleague:
```
https://yourusername.github.io/background-attempt/admin
```

They can:
1. Edit all content using the form
2. Preview changes in their browser
3. Export the JSON file
4. Share the exported file with you (or you can give them repo access)

## Troubleshooting

**Changes not showing?**
- Make sure you clicked "Save to Browser"
- Refresh the main page
- Check browser console for errors

**Want to reset?**
- Click "Reset" in the admin interface to restore original content

**Need image uploads?**
- Consider upgrading to Sanity.io (see `SANITY_SETUP.md` for instructions)
- Or use external image hosting and paste URLs

## Advanced: Using Sanity.io

For a more professional solution with:
- Built-in image uploads
- Real-time collaboration
- Version history
- Shareable admin link

See `SANITY_SETUP.md` for setup instructions.

