# 30 CLICKS Website

The official website for 30 CLICKS - A digital disposable camera app that delivers physical prints to your door.

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/ChangezAhm/30clickssite.git
   cd 30clickssite
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase credentials in the `.env` file

4. Build the project
   ```bash
   npm run build
   ```

5. For development:
   ```bash
   npm run dev
   ```

## Firebase Integration

The website uses Firebase for storing beta tester signups. To make this work, you need to:

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore database
3. Add your Firebase configuration to the `.env` file
4. Deploy the site with the bundled JavaScript

## Deployment on Render

### Setting up the project on Render

1. Sign in to your Render account at https://dashboard.render.com/
2. Click "New" and select "Static Site"
3. Connect your GitHub repository for the site
4. Configure the deployment settings:
   - **Name**: 30clicks-website (or your preferred name)
   - **Branch**: main (or your main branch)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `/` (the root, since index.html is at the root)

### Environment Variables Setup

Render needs all the Firebase configuration variables to be set in the dashboard:

1. On your site's dashboard in Render, navigate to the "Environment" section
2. Add each of these environment variables from your `.env` file:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
   - `FIREBASE_MEASUREMENT_ID`

### Troubleshooting Deployment Issues

If your site isn't working after deployment, check these common issues:

1. **Form stuck in "Processing" state**: Check the browser console for errors related to Firebase. Make sure all environment variables are set correctly.

2. **Site not loading at all**: Verify that the build command completed successfully and that the `dist/main.bundle.js` file is being served. Check Render's deployment logs.

3. **Firebase permission errors**: Ensure that in your Firebase console:
   - Firestore database has been created 
   - Security rules allow write access for beta-testers collection

4. **Cross-Origin (CORS) issues**: If you see CORS errors in the console, you may need to update your Firebase security rules to allow your Render domain.

5. **Bundle not being found**: Make sure the script path in your HTML file is correct (`<script src="dist/main.bundle.js"></script>`).

### Manual Deployment Alternative

If you continue to have issues with automatic deployment, you can:

1. Build locally: `npm run build`
2. Upload both your static files (HTML, CSS, images) and the `dist` folder contents to Render manually as a static site

### Testing Your Deployment

After deploying:

1. Open your site and check the browser console for any errors
2. Test the beta signup form to ensure it properly submits data
3. Verify that data is appearing in your Firebase Firestore database

## License

All rights reserved. © 2025 30 CLICKS LTD.