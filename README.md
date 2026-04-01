# Farmed Animal Advocacy Directory (Africa)

**A collaborative project with [Animal Advocacy Africa](https://www.animaladvocacyafrica.org/)**

A high-fidelity, interactive directory designed to foster collaboration, transparency, and growth within the farmed animal advocacy movement in Africa.

🔗 **Live Site**: [africafarmedanimals.info](https://africafarmedanimals.info/)

## 🌟 Overview

The **Farmed Animal Advocacy Directory** is a centralised hub for discovering and connecting with organisations dedicated to improving the lives of farmed animals across the African continent. It provides a scannable, filterable, and data-rich interface for movement partners, funders, and advocates.

## 🚀 Key Features

- **Interactive Directory**: Browse organisations with high-fidelity cards detailing their focus, species, and location.
- **Advanced Filtering**: Filter by Region/Country, Interventions (Programmes), and Animal Species.
- **Movement Map**: A visual representation of organisational footprints across Africa using an interactive SVG map.
- **Weighted Recommendations**: A discovery algorithm that prioritises "Similar Organisations" based on shared interventions, species, and regional overlap.
- **Responsive Design**: Fully optimised for desktop, tablet, and mobile devices.
- **Blueprint Mode**: A unique "Blueprint" visual mode for a technical, high-contrast viewing experience.

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **Map Rendering**: D3 Geo + TopoJSON
- **Build Tool**: Vite 6
- **Analytics**: Vercel Analytics
- **Hosting**: Vercel

## 📂 Project Structure

```text
├── components/          # UI components
│   ├── Navbar.tsx       # Top navigation with view toggle & "Get Listed" CTA
│   ├── Hero.tsx         # Search bar & quick-access country filters
│   ├── Sidebar.tsx      # Collapsible filter groups (Region, Interventions, Species)
│   ├── OrgCard.tsx      # Organisation card with logo, tags, and links
│   ├── MapView.tsx      # Interactive SVG map of Africa
│   ├── Modals.tsx       # Share, Feedback, Org Detail, and Get Listed modals
│   └── Footer.tsx       # Footer with branding, links & disclaimer
├── public/              # Static assets (favicons, logos, manifests)
├── types.ts             # Global TypeScript definitions (Organisation, FilterState)
├── constants.ts         # Organisation data, filter options, brand colours
├── App.tsx              # Main application logic, state, and view routing
├── index.tsx            # React DOM entry point
├── index.html           # HTML shell with tailwind configuration and font imports
├── index.css            # Global styles and custom component rules
├── vite.config.ts       # Vite configuration
├── metadata.json        # Application metadata and permissions
└── package.json         # Dependencies and scripts
```

## ⚙️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/iMaasai/animal-advocacy-directory-demo.git
    cd animal-advocacy-directory-demo
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:3000`.
4.  **Build for Production**:
    ```bash
    npm run build
    ```

## 🔄 Managing Organisations

The directory is data-driven. Organisation data is sourced from a [Google Form](https://docs.google.com/forms/) where organisations submit their details. To add new responses to the directory, you only need to modify one file.

### 1. Locate the Data File
All organisation data is stored in `constants.ts` (the `ORGANISATIONS` array).

### 2. Adding a New Organisation
Copy an existing entry and update the fields. Each organisation follows this structure:

```typescript
{
  id: 'unique-id',               // Use lowercase-kebab-case
  name: 'Organisation Name',
  logo: 'https://drive.google.com/open?id=...', // Google Drive share link
  address: 'Physical Address',    // Leave as '' if not provided
  country: 'Country Name',       // Use "Pan-African" for regional orgs; comma-separated for multi-country
  email: 'contact@email.com',
  social: 'https://social-link.com', // Primary social media profile URL
  website: 'https://website.com',
  species: ['Chickens', 'Pigs', 'Cross-species advocacy'],
  focus: ['Policy & legal advocacy', 'Movement & capacity building']
}
```

### 3. Standard Categories

**Species** (use these exact strings):
`Cephalopods`, `Chickens`, `Crustaceans`, `Farmed finfish`, `Insects`, `Large ruminants`, `Other farmed mammals`, `Other poultry`, `Pigs`, `Small ruminants`, `Cross-species advocacy`

**Focus / Interventions** (use these exact strings):
`Alternative proteins & food system innovation`, `Corporate & institutional engagement`, `Direct animal assistance`, `Movement & capacity building`, `Policy & legal advocacy`, `Public & consumer outreach`, `Research, investigation & evidence generation`, `Protest & disruptive activism`

### 4. Handling Logos
The app includes a utility (`getDirectDriveUrl`) to convert Google Drive share links into direct image URLs automatically.
1. Upload the logo to Google Drive.
2. Set sharing permissions to **"Anyone with the link"**.
3. Copy the **Share Link** and paste it into the `logo` field.
4. If no logo is available, set the field to `''` — the card will display the organisation's initial letter as a fallback.

### 5. Deleting an Organisation
Remove the object from the `ORGANISATIONS` array in `constants.ts`.

### 6. Updating Filters
The `REGIONS`, `FOCI`, and `SPECIES` arrays in `constants.ts` define the sidebar filter options. If you add an organisation from a country not yet in `REGIONS`, add it there too.

---

## 🚢 Deployment

This project is deployed on **Vercel** with automatic deployments on push to `main`.

### Live Deployment

| | |
|---|---|
| **Live URL** | [africafarmedanimals.info](https://africafarmedanimals.info/) |
| **Vercel Dashboard** | [vercel.com/imaasais-projects/animal-advocacy-directory](https://vercel.com/imaasais-projects/animal-advocacy-directory) |
| **Branch** | `main` (auto-deploys on push) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Deployment Workflow

1. Make changes locally and test with `npm run dev`.
2. Commit and push to `main`:
   ```bash
   git add -A
   git commit -m "feat: description of changes"
   git push origin main
   ```
3. Vercel automatically builds and deploys. Check the dashboard for build status.

### Custom Domain

The custom domain `africafarmedanimals.info` is configured in Vercel's project settings under **Settings → Domains**. Vercel handles SSL/HTTPS automatically.

---

## 🛡️ Recommendations for Production

### 1. Logo Hosting Reliability
- **Current State**: Logos are served via a Google Drive thumbnail URL hack.
- **Risk**: Google does not officially support this as a permanent image hosting service.
- **Recommendation**: If logos stop loading, migrate images to a dedicated host like **Cloudinary** or **ImgBB** and update the URLs in `constants.ts`.

### 3. Domain & SSL
- Vercel provides automatic HTTPS for all deployments including custom domains — no additional configuration required.

---

## � Future Improvements

As the directory scales past 100+ organisations, consider the following technical roadmap items to streamline operations and enhance the UI:

### 1. Database Migration
Currently, organisations are hardcoded in `constants.ts`. Migrating to a Database or Backend-as-a-Service (BaaS) like Supabase or Firebase will make data entry simpler and decouple content updates from code deployments.

### 2. Automated Form Sync
Since organisations apply via Google Forms, establishing an automated pipeline (e.g., via Zapier or a serverless function) to sync approved spreadsheet rows directly to the database will eliminate manual data entry.

### 3. Dedicated Image Hosting
Logos are currently served directly from Google Drive share links. Moving these assets to a dedicated CDN/Image host like Cloudinary guarantees long-term reliability against undocumented API changes.

### 4. "Load More" Pagination
To maintain smooth scrolling and prevent cognitive overload, shift the UI from a single long-scroll page to a "Load More" pagination strategy once the list becomes excessively long.

### 5. Analytics Upgrades
The application currently contains dormant event tracking code using `@vercel/analytics` to measure key user interactions (viewing profiles, outbound links, map usage, filtering, etc.). These custom events require a paid Vercel Pro plan to view the dashboard breakdowns. Once the project upgrades its hosting plan, or if the team decides to migrate to a free alternative (e.g., PostHog, Google Analytics), the existing `track()` functions are already instrumented and ready to be connected.

---

## �📋 Data Disclaimer

This directory is a community resource. Data is self-reported by listed organisations and not independently verified by Animal Advocacy Africa.

## 🤝 Contributing

We welcome submissions! Use the **"Get Listed"** feature within the app to submit your organisation for review.

---

*Built with 🩵 in Africa for the Animal Advocacy Movement.*
