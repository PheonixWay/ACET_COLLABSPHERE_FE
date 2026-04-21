# CollabSphere Frontend (CollabSphereFE)

A modern frontend for the CollabSphere platform, built with React and Vite.

## Project Structure

- **src/**: Main source code (components, pages, context, hooks, services, etc.)
- **public/**: Static assets
- **index.html**: Main HTML entry point
- **tailwind.config.js**: Tailwind CSS configuration
- **vite.config.js**: Vite build configuration

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

The app will be available at the URL shown in your terminal (usually http://localhost:5173).

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Folder Overview
- **components/**: UI components (atoms, molecules, organisms, templates)
- **context/**: React context providers (Auth, Data, UI)
- **data/**: Mock data for development
- **hooks/**: Custom React hooks
- **lib/**: Utility libraries (e.g., roles)
- **pages/**: Application pages (Landing, Loading, Auth, Brand, etc.)
- **routes/**: App routing configuration
- **services/**: API and business logic

## Customization
- Update Tailwind styles in `tailwind.config.js` and `index.css`.
- Add new pages/components in the respective folders under `src/`.

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a pull request

## License
Specify your license here (e.g., MIT, Apache 2.0, etc.)

---

*Last updated: April 21, 2026*