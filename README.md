# ThriveSecure

Welcome to **ThriveSecure**, a secure, user-friendly digital platform for purchasing, managing, and tracking your life and health insurance policies. Our mission is to empower individuals and families with transparent, accessible, and modern insurance solutions for a confident future.

---

## ✨ Key Features

- 🛡️ Purchase life & health insurance policies easily
- 🗂️ Manage, view, and track policies in a personal dashboard
- 💳 Secure Stripe payment integration
- 📊 Dynamic policy statistics and data visualization
- 🔔 Real-time notifications for payment and policy updates
- 👤 Secure login, registration & role-based dashboards
- 📈 Admin, Agent & Customer analytics and management according their role

---

## ⚙️ Tech Stack

### Frontend

- **React** — Core UI library
- **Tailwind CSS** — Utility-first CSS framework
- **React Router** — Declarative routing
- **Firebase Auth** — User authentication
- **Stripe** — Payment processing
- **Framer Motion** — Animations and transitions

---

## 📦 NPM Packages Used

### Client Side

| Package                      | Purpose                                 |
|------------------------------|-----------------------------------------|
| `@stripe/react-stripe-js`    | Stripe React integration               |
| `@stripe/stripe-js`          | Stripe client SDK                       |
| `@tailwindcss/vite`          | Tailwind plugin for Vite                |
| `@tanstack/react-query`      | Data fetching & caching                 |
| `axios`                      | HTTP client                             |
| `firebase`                   | Firebase SDK                            |
| `jspdf`                      | PDF generation for policies/invoices   |
| `lottie-react`               | Lottie animations                       |
| `motion`                     | Animation & transition effects         |
| `react`                      | Core React library                      |
| `react-countup`              | Animated policy/statistics counters    |
| `react-dom`                  | DOM rendering                           |
| `react-helmet-async`         | SEO management                          |
| `react-hook-form`            | Form handling & validation             |
| `react-icons`                | Icon library                            |
| `react-multi-carousel`       | Responsive carousel                     |
| `react-router`               | Frontend routing                        |
| `react-toastify`             | Toast notifications                     |
| `recharts`                   | Chart visualizations                    |
| `sweetalert2`                | Alert modals                            |
| `swiper`                     | Swiper sliders                          |
| `tailwindcss`                | Tailwind CSS                            |

---

## 🛠️ Setup Instructions & Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ameerhamzahd/thrivesecure.git
    cd thrivesecure
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

    ⚠️ Ensure Tailwind CSS is initialized if not already:

    ```bash
    npx tailwindcss init -p
    ```

3. **Configure Firebase:**

    Create a `.env.local` file and add your Firebase configuration:

    ```env
    VITE_API_KEY=your_api_key
    VITE_AUTH_DOMAIN=your_auth_domain
    VITE_PROJECT_ID=your_project_id
    VITE_STORAGE_BUCKET=your_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_sender_id
    VITE_APP_ID=your_app_id
    ```

4. **Configure Stripe (optional):**

    Add your Stripe publishable key in `.env.local`:

    ```env
    VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key
    ```

5.  **Configure cloudinary (optional):**

    Add your cloudinary publishable key in `.env.local`:

    ```env
    VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
    ```

6. **Run locally:**

    ```bash
    npm run dev
    ```

---

## ⚛️ Fix Client-Side Routing (React Router)

If using React Router with Firebase Hosting, add a `_redirects` file in your `public/` folder:

    ```
    /* /index.html 200

---

## 🚀 Deployment Steps to Firebase

1. **Login to Firebase CLI:**

    ```bash
    npm install -g firebase-tools
    firebase login
    ```

2. **Initialize Firebase in your project:**

    ```bash
    firebase init
    ```

    - Choose **Hosting**.
    - Select your Firebase project.
    - Set `dist` as the public directory.
    - Choose **Yes** for single-page app rewrite (`index.html`).
    - Choose **No** for GitHub deploys unless needed.

3. **Build your React app:**

    ```bash
    npm run build
    ```

4. **Deploy to Firebase:**

    ```bash
    firebase deploy
    ```

---

## 📬 Contact

For issues or suggestions, please contact: ameerhamzah.daiyan@gmail.com

---

## 📄 License

This project is licensed under the MIT License.

---

## ✨ Acknowledgements

Thanks to Firebase, Stripe, Tailwind CSS, and the React ecosystem for powering this project.
