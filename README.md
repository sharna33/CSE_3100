# CSE_3100   
This is a project of CSE-3100.
 
**🚀 Overview**    
This repository contains the source code for a web application developed as part of the CSE-3100 course. The project is built with Next.js (React framework) and Tailwind CSS on the frontend, and uses a MySQL database for backend data storage. Core functionality revolves around the RUET V20 dataset (stored in ruet_v20.sql).

Key features include:       

- A Next.js–based frontend with server‐side rendering and API routes

- Tailwind CSS for utility‐first styling

- Middleware for custom request handling (e.g., authentication, logging)

- Database schema and seed data in raw SQL files

- Configurable environment variables via .env-sample

**📁 Repository Structure**    
├── app/                    
│   └── (Next.js “app router” pages and layout files)  
├── components/             
│   └── (Reusable React components)  
├── config/                 
│   └── (Configuration utilities, e.g., database connection helpers)  
├── icons/                  
│   └── (SVG/icon assets used throughout the UI)  
├── lib/                    
│   └── (Library functions—helpers/utilities)  
├── middlewares/            
│   └── (Custom Express/Next.js middleware logic)  
├── public/                 
│   └── (Static assets: images, fonts, favicon, etc.)  
├── .env-sample             
│   └── Template for environment variables (copy to `.env`)  
├── .eslintrc.json          
│   └── ESLint configuration (JavaScript/React linting rules)  
├── .gitattributes          
│   └── Git attributes for normalization and line endings  
├── .gitignore              
│   └── Ignored files/folders (node_modules, `.env`, build artifacts)  
├── LICENSE                 
│   └── MIT License text  
├── README.md               
│   └── (You are here)  
├── back_ct_result.sql      
│   └── SQL script for “back_ct_result” dataset (table schemas + seed data)  
├── jsconfig.json           
│   └── JavaScript/TypeScript project settings (paths, aliases)  
├── middleware.js           
│   └── Entry‐point middleware (e.g., global request logger or error handler)  
├── next.config.mjs         
│   └── Next.js custom configuration (image domains, rewrites, etc.)  
├── package.json            
│   └── Project metadata, dependencies, and npm scripts  
├── postcss.config.mjs      
│   └── PostCSS configuration (Tailwind CSS, autoprefixer)  
├── ruet_v20.sql            
│   └── Primary RUET V20 database schema and seed data  
├── ruet_v20_bak.sql        
│   └── Backup of RUET V20 dataset (optional/legacy)  
├── tailwind.config.js      
│   └── Tailwind CSS customizations (colors, font sizes, plugins)  
└── (other Next.js/React‐specific files in `app/` or root)  

**🔧 Installation & Setup**    
1. Clone the repository
```
git clone https://github.com/sharna33/CSE_3100.git
cd CSE_3100
```
2. Install dependencies
```
npm install
# ‣ Installs all Node.js packages listed in package.json
```
3. Create & configure environment variables

- Make a copy of .env-sample and name it .env: `cp .env-sample .env`
- Open .env in your editor and set the following variables (example shown for MySQL):
```
# Database connection
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=ruet_v20

# Next.js settings
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# (Any other keys—e.g., API keys, secret tokens—can be added here)
```
4. Run the development server
```
npm run dev
# ‣ Starts Next.js in development mode on http://localhost:3000
```

**📖 Usage**    
Once the development server is running, navigate to http://localhost:3000 in your browser.

- The homepage (in app/page.jsx or app/page.tsx) is the main landing page.

- Use the navigation bar (e.g., in components/NavBar.jsx) to move between different sections—such as student listings, course catalogs, result analysis, etc.

- API routes are located under pages/api/ (or app/api/ if using the App Router). You can inspect and test endpoints like:   

  - GET /api/students
  
  - POST /api/results
  
  - GET /api/courses

- Frontend components in components/ are typically self‐contained (e.g., <StudentTable />, <CourseCard />). They leverage utility classes from Tailwind CSS and fetch data via fetch() or any HTTP client.   



