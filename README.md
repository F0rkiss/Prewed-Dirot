# 💍 Wedding Invitation Website

A beautiful and interactive wedding invitation website built with modern web technologies. Features a splash screen with asset preloading, dynamic gallery, video section, and guest forms.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-2.78.0-3ECF8E?logo=supabase)

## ✨ Features

- **🎨 Splash Screen with Preloader** - Loads all assets (images, videos) before revealing content
- **📱 Responsive Design** - Optimized for both mobile and desktop with split-screen layout
- **🖼️ Dynamic Gallery** - Image gallery with modal view and thumbnail navigation
- **🎥 Video Section** - Embedded wedding video with controls
- **🎵 Background Music** - Autoplay background music with controls
- **🎁 Gifts Section** - Digital gift registry information
- **📝 RSVP Form** - Guest confirmation and message form
- **⏱️ Countdown Timer** - Live countdown to the wedding date
- **📍 Location Section** - Wedding venue information and maps
- **🌅 Background Carousel** - Smooth image transitions in the background

## 🛠️ Tech Stack

### Frontend

- **React 18.3.1** - UI library
- **Vite 5.2.0** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Boxicons** - Icon library

### Backend & Storage

- **Supabase 2.78.0** - Backend as a Service for storage and database

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/damarpradnyana/Prewed-Dirot.git
cd Prewed-Dirot
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
prewed-dirot/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, music, and media files
│   ├── components/     # React components
│   │   ├── carousel/   # Background carousel component
│   │   ├── layout/     # Layout components
│   │   ├── section/    # Page sections
│   │   └── ui/         # Reusable UI components
│   ├── lib/            # Utilities (Supabase, utils)
│   ├── pages/          # Page components
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── firebase.js         # Firebase configuration
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite configuration
```

## 🎯 Key Components

- **SplashScreen** - Asset preloader with progress indicator
- **BackgroundCarousel** - Auto-rotating background images from Supabase
- **GallerySection** - Interactive photo gallery with modal view
- **VideoSection** - Embedded video player
- **FormSection** - Guest RSVP and message submission
- **CountdownSection** - Real-time countdown to wedding date
- **LocationSection** - Venue information with maps
- **BackgroundMusic** - Audio player with play/pause controls

## 🎨 Customization

### Update Wedding Information

Edit the `weddingData` object in [src/App.jsx](src/App.jsx):

```javascript
const weddingData = {
  groomName: "Your Name",
  brideName: "Partner Name",
  weddingDate: "Your Wedding Date",
};
```

### Add Images

Upload your images to Supabase Storage:

- Carousel images: `Media/images/carousel/`
- Gallery images: `Media/images/gallery/`
- Videos: `Media/videos/`

## 📄 License

This project is private and intended for personal use.

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📧 Contact

For inquiries, please reach out through GitHub.

---

Built with ❤️ for Dirotsaha & Pradnya's Special Day
