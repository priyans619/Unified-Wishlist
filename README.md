# Unified Wishlist

Unified Wishlist is a cross-platform app (React Native frontend + Node.js backend) that allows users to create, manage, and share wishlists across different categories. It centralizes wishlist management in one place, making it easier for users to organize, track, and share their wishes.


📂 Project Structure

```/Unified-Wishlist
│
├── server/   # Node.js + Express backend (unchanged)
│   ├── src/
│   │   ├── utils/        # helper functions
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # API logic
│   │   ├── index.ts      # Main entrypoint
│   │   └── config/       
│   ├── package.json
│   └── .env
│
├── client/  # RN-expo + Nativewind CSS frontend
│   ├── app/          # expo-router navigation
│   ├── components/   # UI components
│   ├── context/      # Context API (WishlistProvider etc.)
│   ├── assets/       # Images, fonts, icons
│   ├── types/        # TypeScript type definitions
│   ├── config/       # App-level configs (e.g., baseUrl.ts)
│   ├── App.tsx       # Root app entry
│   ├── package.json
│   └── .env
│
└── README.md


```
##  Technologies

### **Frontend**
- **ReactNative (Expo)** – Mobile framework  
- **Native WInd CSS** – Styling and UI components  
- **Axios** – API communication  
- **React Context API** – State management  

### **Backend**
- **Node.js + Express.js** – Server framework
- **dotenv** – Environment variables  
- **CORS** – Secure cross-origin requests  
- **Axios** – External API requests  
---

## Functionalities

1. **Add Links** – Users can enter any valid URL to preview before saving(upto 512kb).
2. **URL Preview** – Fetch metadata (title, image, description) of the given link
3. **Save to Wishlist** - Store links (with preview data)
4. **Cross-Platform Access** – Unified experience across web & mobile (React Native + Node backend).  
5. **Responsive UI** – With NativewindCSS.  
---

## Local Setup
**To run locally on your machine :**
### Clone Repository
```
- git clone https://github.com/<your-username>/Unified-Wishlist.git
- cd Unified-Wishlist
```

## Backend Setup

```
- cd server
- npm install
```

```
- Run backend: npm run dev

- Server will run at → http://localhost:5000/
```

## Frontend Setup
### In src/api
```
- For preview- API_BASE= http://localhost:5000/api/preview

```
### .env file

**Create .env file in fronted rest base.url config will cover the port for all devices**
```
LAN_IP=192.168.1.2

PORT=5000
```

```
- cd app

- npm install
```

```
- Run frontend: npm expo start

- Web will run at → http://localhost:8081
- Press a to run on emulator device

```
---

## 📑 API Documentation

```
Base URL- http://localhost:5000/preview

Backend endpoint: http://localhost:5000/api/preview

Example- http://localhost:5000/api/preview -H "Content-Type: application/json" -d "{\"url\":\"http://localhost:5000/api/preview"}"
(This endpoint will return JSON data for preview)

Relpace localhost with LAN IP if using Physical devices
- Check /health (should always succeed)
  curl -i http://localhost:3000/health 

- Check /preview with a safe URL (like nike.com)
  curl -i "http://localhost:3000/preview?url=https://www.nike.com/in/t/vaporfly-4-road-racing-shoes-PTwDtp/"

  Expected: Returns metadata or preview JSON.

- Check /preview with a blocked URL (private IP)
  curl -i "http://localhost:3000/preview?url=http://127.0.0.1:22"

  Expected: Should return 400 or 403 with Blocked unsafe private/internal IP address
-
```

# Thanks 😊😊