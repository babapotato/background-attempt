# Sanity.io Setup Guide

This guide will help you set up Sanity.io for content management with image uploads and a visual editor.

## Step 1: Create a Sanity Account and Project

1. Go to [https://www.sanity.io](https://www.sanity.io) and sign up for a free account
2. Once logged in, click "Create new project"
3. Choose a project name (e.g., "Portfolio Site")
4. Select "Production" as the dataset
5. Click "Create project"

## Step 2: Get Your Project ID

1. After creating the project, go to the project settings
2. Find your **Project ID** (it looks like: `abc123xyz`)
3. Copy this ID - you'll need it in the next step

## Step 3: Configure Environment Variables

1. In your project root, create a file named `.env.local`
2. Add the following content:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

3. Replace `your-project-id-here` with your actual Project ID from Step 2

## Step 4: Access Sanity Studio

You have two options to access Sanity Studio:

### Option A: Use Sanity's Managed Studio (Recommended)
1. Go to [https://manage.sanity.io](https://manage.sanity.io)
2. Sign in with your Sanity account
3. Select your project
4. You'll see the Studio interface where you can edit content
5. Share this link with your colleague after inviting them

### Option B: Local Development Studio
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/studio`
   - This is your Sanity Studio admin interface
   - Note: This only works in development mode (not in production builds)

3. Sign in with your Sanity account when prompted

## Step 5: Create Your First Content Entry

1. In Sanity Studio, you should see "Portfolio" in the sidebar
2. Click "Create new" → "Portfolio"
3. Fill in all the fields:
   - **Hero Section**: Add your hero text
   - **Gallery**: Click "Add item" to add gallery images
     - Upload images directly (drag & drop or click to browse)
     - Add titles for each image
   - **About Section**: 
     - Upload the about image
     - Add text paragraphs
   - **Contact Section**: Fill in all contact links

4. Click "Publish" when done

## Step 6: Deploy to Production

### For Local Development:
- The site will automatically use Sanity content when `.env.local` is configured
- Changes in Sanity Studio will be visible immediately after publishing

### For GitHub Pages:
1. Add environment variables to your GitHub repository:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add a new secret:
     - Name: `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - Value: Your Sanity Project ID
   - Add another secret:
     - Name: `NEXT_PUBLIC_SANITY_DATASET`
     - Value: `production`

2. Update your GitHub Actions workflow (`.github/workflows/deploy.yml`) to include these environment variables:

```yaml
env:
  NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
  NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.NEXT_PUBLIC_SANITY_DATASET }}
```

3. Push your changes and the workflow will build with Sanity

## Sharing with Your Colleague

1. Share the Sanity Studio URL: `https://yourdomain.com/studio`
2. Invite them to your Sanity project:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Go to "Members" or "Access"
   - Click "Invite member"
   - Enter their email address
   - They'll receive an invitation to join

3. They can now:
   - Access the Studio at `/studio`
   - Edit all content
   - Upload images directly
   - See changes live after publishing

## Features

✅ **Free Tier Includes:**
- Up to 3 users
- 100,000 documents
- Image hosting and optimization
- Real-time updates
- Version history

✅ **What You Can Do:**
- Upload images directly (no external hosting needed)
- Edit text in a visual editor
- Add/remove gallery items
- Update contact information
- See changes immediately after publishing

## Troubleshooting

**Studio not loading?**
- Check that `.env.local` has the correct Project ID
- Make sure you're signed in to Sanity
- Restart your dev server: `npm run dev`

**Content not showing?**
- Make sure you've published at least one Portfolio document
- Check browser console for errors
- Verify environment variables are set correctly

**Images not loading?**
- Make sure images are uploaded (not just URLs)
- Check that images are published in Sanity
- Verify the Sanity client is configured correctly

## Need Help?

- Sanity Documentation: [https://www.sanity.io/docs](https://www.sanity.io/docs)
- Sanity Community: [https://slack.sanity.io](https://slack.sanity.io)

