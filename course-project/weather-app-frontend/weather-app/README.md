# weather-app

This directory contains the frontend source code for the weather app, built with React and Vite.

## Development

To start development on this project you need to run the following commands:
```bash
npm install       # To install all dependencies
npm run dev       # To start the development server
```

## Development Notes

- Components, pages and services are under `src/`
- Routing is handled using `react-router-dom` and defined in `app.jsx`
- Tailwind (v4) is configured via modifying `tailwind.css` file
- API calls are handled using Axios

## Available Commands

```bash
npm run dev       # Start local development server
npm run build     # Build for production
npm run preview   # Preview built app
npm run lint      # Run ESLint
```