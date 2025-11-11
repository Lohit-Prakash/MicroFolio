# Timeless Persona - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Firebase. Features a fully functional admin dashboard for managing portfolio content with real-time synchronization across all browsers.

## 🚀 Live Demo
Visit: **https://myportfolio-50a76.web.app**

## ✨ Features

- **Modern UI/UX** - Beautiful, responsive design with dark/light theme support
- **Mobile-First** - Optimized for all devices (phones, tablets, desktops)
- **Admin Dashboard** - Full-featured admin panel to manage portfolio content
- **Real-Time Sync** - Changes made in admin panel instantly appear across all browsers
- **Firebase Backend** - Secure data storage with Firestore
- **Media Management** - Upload and manage images and PDFs via Firebase Storage
- **Project Gallery** - Showcase your projects with images, technologies, and links
- **Experience & Education** - Display your work history and academic background
- **Contact Section** - Integrated contact management
- **Analytics Ready** - Built-in Google Analytics support

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI components
- **Build Tool:** Vite
- **Backend:** Firebase (Firestore, Storage)
- **Deployment:** Firebase Hosting
- **Version Control:** Git + GitHub

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm/bun
- Firebase account (https://firebase.google.com)
- Git installed locally

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Lohit-Prakash/timeless-persona-site.git
cd timeless-persona-site
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Firebase
```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Connect to your Firebase project
firebase use --add
```

### 4. Create Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Run Development Server
```bash
npm run dev
```
Open http://localhost:8080 in your browser.

### 6. Build for Production
```bash
npm run build
```

### 7. Deploy to Firebase
```bash
firebase deploy
```

## 📝 Admin Dashboard

Access the admin panel at:
- **URL:** `https://your-site.web.app/#/admin`
- **Username:** admin
- **Password:** admin123

### Admin Features:
- ✏️ Edit personal information and profile image
- 📁 Manage projects with images and PDFs
- 💼 Add work experience entries
- 🎓 Manage education history
- ℹ️ Edit "About" section
- 📧 Manage contact information
- 🖼️ Upload media to Firebase Storage

## 🔒 Firestore Rules

The project uses permissive Firestore rules for development. **For production, update `firestore.rules`** with proper security rules:

```
match /portfolios/{document=**} {
  allow read: if true;  // Anyone can read
  allow write: if request.auth != null;  // Only authenticated users can write
}
```

## 📂 Project Structure

```
src/
├── components/
│   ├── admin/              # Admin panel components
│   ├── modals/             # Modal dialogs
│   ├── ui/                 # Shadcn UI components
│   └── *.tsx               # Page components
├── contexts/
│   ├── PortfolioDataContext.tsx  # Firestore data management
│   └── ThemeProvider.tsx         # Theme context
├── lib/
│   ├── firebase.ts         # Firebase configuration
│   └── gcs-upload.ts       # Media upload helpers
├── pages/
│   ├── Index.tsx           # Homepage
│   └── NotFound.tsx        # 404 page
├── App.tsx                 # Main app component
└── main.tsx                # Entry point
```

## 🔄 Real-Time Updates

The app uses Firebase Firestore `onSnapshot` listeners to provide real-time updates:
- Admin makes changes → Data written to Firestore
- `onSnapshot` listener fires → All connected browsers receive update
- UI automatically re-renders with new data

## 📱 Mobile Optimization

- Responsive layout with Tailwind CSS breakpoints
- Touch-friendly navigation
- Optimized images and lazy loading
- Safe area support for notched devices
- Mobile-first design approach

## 🚀 Deployment

The project is configured for automatic deployment to Firebase Hosting:

```bash
npm run build       # Build for production
firebase deploy     # Deploy to Firebase
```

GitHub Actions workflows (in `.github/workflows/`) can automate deployment on push to main branch.

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Changes not showing across browsers?
- Ensure all users read from the same Firestore document (`portfolios/default`)
- Check browser console for Firestore errors
- Verify Firestore rules allow read/write

### Images not loading?
- Check Firebase Storage permissions
- Verify media URLs in Firestore are correct
- Ensure uploads completed successfully

### Build errors?
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear `.next` or `dist` folder

## 📄 License

This project is open source. Feel free to use it as a template for your own portfolio!

## 👤 Author

**Lohit Prakash Sundararajan**
- GitHub: [@Lohit-Prakash](https://github.com/Lohit-Prakash)
- LinkedIn: [Lohit Prakash](https://linkedin.com/in/lohitprakash)

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📞 Support

For issues and questions, please open a GitHub issue.

---

**Last Updated:** November 11, 2025
