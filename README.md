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

When deploying to Render:

1. Build the site locally with `npm run build`
2. Set up environment variables in Render's dashboard with your Firebase credentials
3. Deploy your site

## License

All rights reserved. © 2025 30 CLICKS LTD.