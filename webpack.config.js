const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

// Get environment variables for Firebase - use empty strings as defaults
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || '';
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN || '';
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || '';
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET || '';
const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID || '';
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID || '';
const FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID || '';
const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL || '';

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    main: './js/script.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // Use dotenv for local development
    new Dotenv({
      systemvars: true // This allows loading env vars from the system too
    }),
    
    // Explicitly define process.env variables that will be available in the bundle
    new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY': JSON.stringify(FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(FIREBASE_AUTH_DOMAIN),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(FIREBASE_PROJECT_ID),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(FIREBASE_STORAGE_BUCKET),
      'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(FIREBASE_MESSAGING_SENDER_ID),
      'process.env.FIREBASE_APP_ID': JSON.stringify(FIREBASE_APP_ID),
      'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(FIREBASE_MEASUREMENT_ID),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(FIREBASE_DATABASE_URL)
    })
  ]
};