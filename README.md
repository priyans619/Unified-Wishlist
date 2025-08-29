# Unified Wishlist

Unified Wishlist is a cross-platform app (React Native frontend + Node.js backend) that allows users to create, manage, and share wishlists across different categories. It centralizes wishlist management in one place, making it easier for users to organize, track, and share their wishes.


📂 Project Structure

```/Unified-Wishlist
│
├── server/   # Node.js + Express
│   ├── src/
│   │   ├── utils/       # helper function
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # API logic
│   │   ├── index.ts    # Main entrypoint
│   │   └── config/     
│   ├── package.json
│   └── .env
│
├── app/  # RN-expo + Nativewind CSS app
│   ├── src/
│   │   ├── app/          # route folder
│   │   ├── components/   # UI components
│   │   ├── context/      # Context API global state
│   │   ├── types/        # typecheck
│   │   ├── config/       # App-level configs (e.g., baseUrl.ts)
│   │   ├── hooks/        # Custom React hooks
│   │   └── App.ts
│   ├── package.json
│   └── .env
│
└── README.md

```
##  Technologies

### **Frontend**
- **ReactNative (Expo)** – Frontend framework  
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
- cd weather-app
```

## Backend Setup

```
- cd backend
- npm install
```

```
- Run backend: npm run dev

- API will run at → http://localhost:5000/api
```

## Frontend Setup
### In src/api
```
- For preview- API_BASE= http://localhost:5000/api/prview

```
### .env file
**Create .env file in backend**
```
LAN_IP=192.168.1.2

PORT=5000
```

```
- cd frontend

- npm install
```

```
- Run frontend: npm run dev

- Weba will run at → http://localhost:0000
```
---

## 📑 API Documentation

```
Base URL- http://192.168.1.2:5000/

Backend endpoint: http://192.168.1.2:5000/api/preview

Example- http://192.168.1.2:5000/api/preview -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
(This endpoint will return JSON data for preview)
```

# Thanks 😊😊