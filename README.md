# FIT5032
Internet Application Development
# Elder Care Connect — v1.0

A web platform for a health charity dedicated to improving the well-being and quality of life of the elderly. Elder Care Connect brings together patient records, community events, an AI health assistant, data insights, mapping, and outbound communication in a single role-based application.

Built for **FIT5032 – Internet Application Development**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition + Options API), Vite |
| Routing | Vue Router 4 |
| UI | Bootstrap 5, PrimeVue 4, PrimeIcons, PrimeFlex |
| Auth & Data | Firebase Authentication, Cloud Firestore |
| Serverless | Firebase Cloud Functions (Express-style HTTP functions) |
| AI | Google Generative AI (Gemini 1.5 Flash) |
| Charts | ApexCharts (`vue3-apexcharts`), Chart.js (`vue-chartjs`) |
| Maps | Mapbox GL + Mapbox Directions/Geocoding |
| Email | EmailJS (client) / SendGrid + Nodemailer (server) |
| Calendar | FullCalendar |
| Export | PapaParse (CSV), jsPDF + jspdf-autotable (PDF) |

---

## Features (v1.0)

### 1. Authentication & Role-Based Access
- Email/password sign-up and login via Firebase Auth.
- Two roles — **Admin** and **User** — stored in Firestore and used to gate navigation and routes.
- "Forgot password" reset flow from the login screen.
- Reactive header that shows different links depending on whether a user is signed in and what role they hold.

### 2. About Us / Home
- Landing page with an image carousel and the charity's mission and origin story.

### 3. Ratings & Reviews
- Visitors submit a 1–5 rating with a written review.
- Client-side validation and a running average rating, persisted in the browser.

### 4. Gemini AI Health Assistant
- Conversational assistant powered by Google's Gemini model.
- Tailored to elder-care questions: exercise, nutrition, memory, general health guidance.

### 5. Patient Management
- **Add Patient** form (name, care provider, insurance provider, country, age, phone, occupation) writing to Firestore via a Cloud Function.
- **Patient Table** built on PrimeVue DataTable with global search, per-column filtering, multi-column sorting, and pagination.

### 6. Event Management
- **Event Table** listing upcoming events with the same search / sort / filter / pagination capabilities.

### 7. Interactive Data Visualisation
- ApexCharts dashboard with a chart selector: patient age distribution (bar), patient count over time (line), and patient country distribution (pie).

### 8. Maps & Navigation
- Mapbox map with start/destination inputs and turn-by-turn route rendering for location-based assistance.

### 9. Email Sending
- Form to compose and send an email to a named recipient via EmailJS.

### 10. Data Export
- Reusable export component that downloads any table as **CSV** or **PDF**.

### 11. Public API & API Keys
- Self-service API-key generator.
- Documented REST endpoints (served by Cloud Functions) for retrieving patients and events, authenticated with an `x-api-key` header.

### 12. Admin Dashboard
- Aggregate stats (total users, admin count, general user count) and an overview of the management features available to admins.

### 13. Account Information
- Signed-in users can view their stored profile (username, age, email, address, contact and emergency details, role).

### Cloud Functions (backend)
`addPatient`, `countPatients`, `getAllPatients`, `getPatientById`, `getAllEvents`, `generateApiKey`, `getAdminDashboardData`.

---

## Project Structure

```
iad-project/
├── functions/            # Firebase Cloud Functions (API + data ops)
├── public/
├── src/
│   ├── assets/           # base + main CSS, logo
│   ├── components/       # BHeader, Footer, ExportComponent, icons
│   ├── firebase/         # Firebase init (auth, firestore, functions)
│   ├── images/           # carousel + hero imagery
│   ├── router/           # route definitions
│   ├── views/            # page-level components (see Features above)
│   ├── GeminiService.js  # Gemini API wrapper
│   ├── mockPatientData.js
│   ├── mockEventData.js
│   ├── App.vue
│   └── main.js
├── firebase.json
├── firestore.rules
├── vite.config.js
└── package.json
```

---

## Getting Started

```sh
cd iad-project
npm install
```

Create a `.env` file in `iad-project/` with your keys:

```
VITE_GOOGLE_AI_STUDIO_API_KEY=your_gemini_key
```

> Note: the Mapbox token and Firebase config are currently hard-coded in source. Before any production use, move these into environment variables and rotate the exposed keys.

### Run / build

```sh
npm run dev       # start dev server with hot reload
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # lint and auto-fix
npm run format    # prettier
```

### Deploy Cloud Functions

```sh
cd iad-project
firebase deploy --only functions
```

---

## Roadmap

AI-focused enhancements planned for upcoming versions are tracked in the issues board — including a context-aware care assistant, medication reminders, sentiment analysis of reviews, and AI-summarised patient notes.

---

## License

Educational project — FIT5032, Monash University.
