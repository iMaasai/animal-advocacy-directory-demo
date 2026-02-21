# Farmed Animal Advocacy Directory (Africa)

A high-fidelity, interactive directory designed to foster collaboration, transparency, and growth within the farmed animal advocacy movement in Africa.

## 🌟 Overview

The **Farmed Animal Advocacy Directory** is a centralised hub for discovering and connecting with organisations dedicated to improving the lives of farmed animals across the African continent. It provides a scannable, filterable, and data-rich interface for movement partners, funders, and advocates.

## 🚀 Key Features

- **Interactive Directory**: Browse organisations with high-fidelity cards detailing their focus, species, and location.
- **Advanced Filtering**: Filter by Region/Country, Interventions (Programmes), and Animal Species.
- **Movement Map**: A visual representation of organisational footprints across Africa using an interactive map.
- **AI Assistant**: A built-in AI companion powered by Gemini to help users find specific organisations or understand the landscape.
- **Smart Recommendations**: An intelligent "Similar Organisations" algorithm that prioritises shared interventions and species.
- **Responsive Design**: Fully optimised for desktop, tablet, and mobile devices.
- **Blueprint Mode**: A unique "Blueprint" visual mode for a technical, high-contrast viewing experience.

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS (Utility-first CSS)
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **AI Integration**: Google Gemini API (@google/genai)
- **Build Tool**: Vite

## 📂 Project Structure

```text
├── src/
│   ├── components/       # Reusable UI components (Navbar, Footer, OrgCard, etc.)
│   ├── services/         # External service integrations (Gemini API)
│   ├── types.ts          # Global TypeScript definitions
│   ├── constants.ts      # Static data and configuration
│   ├── App.tsx           # Main application logic and routing
│   └── index.css         # Global styles and Tailwind configuration
├── public/               # Static assets
└── metadata.json         # Application metadata and permissions
```

## ⚙️ Setup & Installation

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**:
   Create a `.env` file and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
5. **Build for Production**:
   ```bash
   npm run build
   ```

## 🔄 Managing Organisations

The directory is data-driven. To add, update, or remove organisations, you only need to modify one file.

### 1. Locate the Data File
All organisation data is stored in: `src/constants.ts` (specifically the `ORGANISATIONS` array).

### 2. Adding a New Organisation
Copy an existing entry and update the fields. Each organisation follows this structure:

```typescript
{
  id: 'unique-id', // Use lowercase-kebab-case
  name: 'Organisation Name',
  logo: 'https://drive.google.com/open?id=...', // Google Drive share link
  address: 'Physical Address (optional)',
  country: 'Country Name', // Use "Pan-African" for regional orgs
  email: 'contact@email.com',
  social: 'https://social-link.com',
  website: 'https://website.com',
  species: ['Chickens', 'Pigs', 'Cross-species advocacy'], // Use standard categories
  focus: ['Policy & legal advocacy', 'Movement & capacity building'] // Use standard categories
}
```

### 3. Handling Logos
The app includes a utility to handle Google Drive links automatically. 
1. Upload the logo to Google Drive.
2. Set the sharing permissions to **"Anyone with the link"**.
3. Copy the **Share Link** and paste it into the `logo` field. The app will handle the conversion to a direct image URL.

### 4. Deleting an Organisation
Simply remove the object from the `ORGANISATIONS` array in `src/constants.ts`.

### 5. Updating Filters
If you add a new Country, Species, or Intervention type that isn't already in the sidebar, the filters will automatically detect them as long as they are added to the `ORGANISATIONS` data.

---

## 🚢 Deployment

This project is a Single Page Application (SPA) built with Vite. You can host it on any static hosting provider.

### Recommended: Vercel or Netlify
1. **Connect your repository** (GitHub, GitLab, or Bitbucket).
2. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Add Environment Variables**:
   - Add `GEMINI_API_KEY` in the provider's dashboard settings.
4. **Deploy**: The platform will automatically build and serve your app.

### GitHub Pages
1. Install the `gh-pages` package: `npm install gh-pages --save-dev`.
2. Add `base: '/your-repo-name/'` to your `vite.config.ts`.
3. Add a deploy script to `package.json`: `"deploy": "gh-pages -d dist"`.
4. Run `npm run build` then `npm run deploy`.

### General Static Hosting
1. Run `npm run build`.
2. Upload the contents of the `dist/` folder to your web server.
3. **Note**: Ensure your server is configured to serve `index.html` for all routes to support SPA routing (if added in the future).

> [!IMPORTANT]
> **Security Note**: Since this is a client-side app, your `GEMINI_API_KEY` will be included in the client-side bundle. For production environments with high traffic, it is recommended to proxy Gemini API calls through a simple backend server to keep your key secure.

## 🛡️ Recommendations for Production

To ensure the project remains stable and secure for non-technical owners, please consider the following recommendations before final deployment:

### 1. API Key Security
- **Current State**: The Gemini API key is used directly in the frontend. This is fine for a prototype but exposes your key to anyone who inspects the website's code.
- **Recommendation**: For a production-grade app, consider setting up a simple "Proxy Server" (e.g., using Vercel Functions or a small Express app) to handle AI requests. This keeps your API key hidden on the server.

### 2. Logo Hosting Reliability
- **Current State**: The app uses a "thumbnail hack" to display logos directly from Google Drive.
- **Reliability**: While convenient, Google does not officially support this as a permanent image hosting service. It may occasionally fail to load or Google could change the service.
- **Recommendation**: If logos stop appearing, the easiest "low-effort" fix is to move the images to a dedicated image host like **Cloudinary** or **ImgBB**, and update the links in `src/constants.ts`.

### 3. Environment Variable Naming
- **Vite Requirement**: When deploying on platforms like Vercel or Netlify, ensure you name your environment variable `VITE_GEMINI_API_KEY` (with the `VITE_` prefix) if you are using the default Vite build settings.
- **Update Code**: You may need to update `src/services/geminiService.ts` to use `import.meta.env.VITE_GEMINI_API_KEY` instead of `process.env.GEMINI_API_KEY` depending on your hosting provider's requirements.

### 4. Domain & SSL
- Always ensure your site is served over **HTTPS** (most modern providers like Vercel/Netlify do this automatically). The AI Assistant and Map features require a secure context to function correctly in all browsers.

### 5. Maintenance
- **Updating Data**: The project is designed so that a non-technical person can update the directory by simply editing the `src/constants.ts` file. No complex database management is required.

---

## 📋 Data Disclaimer

This directory is a community resource. Data is self-reported by listed organisations and not independently verified by Animal Advocacy Africa.

## 🤝 Contributing

We welcome submissions! Use the "Get Listed" feature within the app to submit your organisation for review.

---

*Built with 🩵 in Africa for the Animal Advocacy Movement.*
