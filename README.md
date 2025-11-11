# MicroFolio - Modern Portfolio Website

A sleek, modern, and fully responsive portfolio website built with cutting-edge web technologies. Features a powerful admin dashboard for managing portfolio content with real-time synchronization across all devices.

## 🚀 Live Demo
Visit: **https://myportfolio-50a76.web.app**

## ✨ Key Features

### 🎨 **Design & UX**
- Modern, minimalist design with smooth animations
- Dark/Light theme support
- Fully responsive - optimized for mobile, tablet, and desktop
- Touch-friendly interface

### 🛠️ **Admin Dashboard**
- Complete content management system
- Real-time updates across all connected browsers
- No page refresh needed - changes appear instantly
- Media upload with Firebase Storage integration

### 📊 **Content Management**
- **Personal Profile** - Manage name, bio, profile picture, and contact info
- **Projects** - Showcase projects with descriptions, images, PDFs, and links
- **Experience** - Display work history with achievements
- **Education** - Highlight academic credentials and specializations
- **About Section** - Custom vision and skills showcase
- **Contact** - Integrated contact information

### 🔒 **Backend & Security**
- Firebase Firestore for reliable data storage
- Real-time database synchronization
- Firebase Storage for media files
- Public read/write support (configurable)

### 📱 **Mobile Optimization**
- Mobile-first responsive design
- Optimized performance for slow connections
- Touch gestures support
- Safe area awareness for notched devices

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Styling** | Tailwind CSS + Shadcn/UI |
| **Build Tool** | Vite |
| **Backend** | Firebase (Firestore + Storage) |
| **Deployment** | Firebase Hosting |
| **Version Control** | Git + GitHub |
| **Icons** | Lucide React |
| **Forms** | React Hook Form |

## 📋 Prerequisites

- Node.js 18 or higher
- npm, pnpm, or bun package manager
- Firebase account (free tier available)
- Git installed locally

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Lohit-Prakash/MicroFolio.git
cd MicroFolio
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
# or
bun install
```

### 3. Configure Firebase
```bash
# Login to Firebase CLI
firebase login

# Connect to your Firebase project
firebase use --add
```

### 4. Set Environment Variables
Create a `.env.local` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 5. Run Development Server
```bash
npm run dev
```
Visit http://localhost:8080

### 6. Build for Production
```bash
npm run build
```

### 7. Deploy to Firebase
```bash
firebase deploy
```

## 🔐 Admin Access

Navigate to: `https://your-domain.web.app/#/admin`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

> ⚠️ **Important:** Change default credentials in production!

## 📂 Project Structure

```
src/
├── components/
│   ├── admin/              # Admin panel UI
│   │   ├── EditProjects.tsx
│   │   ├── EditProfile.tsx
│   │   ├── EditExperience.tsx
│   │   ├── EditEducation.tsx
│   │   ├── EditContact.tsx
│   │   ├── EditAbout.tsx
│   │   └── ...
│   ├── modals/             # Modal dialogs
│   ├── ui/                 # Shadcn UI components
│   ├── Hero.tsx            # Landing section
│   ├── About.tsx           # About section
│   ├── Projects.tsx        # Projects showcase
│   ├── Experience.tsx      # Work experience
│   ├── Education.tsx       # Education section
│   ├── Contact.tsx         # Contact section
│   └── ThemeToggle.tsx     # Dark/light mode
├── contexts/
│   ├── PortfolioDataContext.tsx  # Firestore data management
│   └── ThemeProvider.tsx         # Theme state
├── lib/
│   ├── firebase.ts         # Firebase config
│   └── gcs-upload.ts       # Media upload utilities
├── hooks/
│   ├── use-toast.ts        # Toast notifications
│   └── use-upload-progress.ts
├── pages/
│   ├── Index.tsx           # Homepage
│   └── NotFound.tsx        # 404 page
├── App.tsx                 # Main component
└── main.tsx                # Entry point
```

## 🔄 How It Works

### Real-Time Synchronization
1. Admin makes changes in the dashboard
2. Changes are written to Firestore
3. All connected clients receive live updates via `onSnapshot` listeners
4. UI automatically re-renders with new data

### Data Flow
```
Admin Panel → Firestore ← Visitor Browser
    ↓            ↓
Firebase Storage (media files)
    ↓
Display on Homepage
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (xs)
- **Tablet**: 640px - 1024px (sm, md, lg)
- **Desktop**: > 1024px (xl, 2xl)

## 🔧 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## 🚀 Deployment

### Automatic Deployment
GitHub Actions workflows (in `.github/workflows/`) automatically deploy to Firebase on push to main branch.

### Manual Deployment
```bash
npm run build
firebase deploy
```

## 🔒 Security Considerations

### Current Setup (Development)
```javascript
// firestore.rules - Allow all read/write
match /{document=**} {
  allow read, write: if true;
}
```

### Production Setup (Recommended)
```javascript
match /databases/{database}/documents {
  match /portfolios/{document=**} {
    allow read: if true;  // Public read
    allow write: if request.auth != null;  // Authenticated write only
  }
}
```

## 🐛 Troubleshooting

### Changes not syncing across browsers?
- Verify Firebase rules allow read/write
- Check browser console for Firestore errors
- Ensure all clients use the same `userId` ("default")

### Images not loading?
- Check Firebase Storage permissions
- Verify media URLs in Firestore are correct
- Ensure CORS is properly configured

### Build errors?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Documentation

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## 📝 Features Roadmap

- [ ] Email notifications on contact submissions
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] PWA capabilities
- [ ] CDN integration for media
- [ ] Advanced authentication
- [ ] Blog/Articles section

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### How to Contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Lohit Prakash Sundararajan**

- 🌐 Portfolio: https://myportfolio-50a76.web.app
- 💼 LinkedIn: https://linkedin.com/in/lohitprakash
- 🐙 GitHub: https://github.com/Lohit-Prakash
- 📧 Email: sjlohitp@gmail.com

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- UI Components from [Shadcn/UI](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)
- Powered by [Firebase](https://firebase.google.com)

## 📞 Support

For questions, issues, or suggestions:
1. Check existing [GitHub Issues](https://github.com/Lohit-Prakash/MicroFolio/issues)
2. Create a new issue with detailed description
3. Include steps to reproduce if reporting a bug

---

**Last Updated:** November 11, 2025

**Status:** ✅ Production Ready

Made with ❤️ by Lohit Prakash
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2b7fbef5-fd28-4b0b-8f25-2bf09c9174bf) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
