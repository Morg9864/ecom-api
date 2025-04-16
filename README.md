# ecom‑api

A simple e‑commerce REST API built with Node.js, Express, MongoDB and Cloudinary, featuring JWT authentication, image upload, basic cart & order management, and webhook support.

---

## 🛠️ Prerequisites

- Node.js ≥ 18  
- pnpm ≥ 8  
- A MongoDB connection string (e.g. MongoDB Atlas)  
- A Cloudinary account for image uploads  

---

## 🚀 Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/ecom-api.git
   cd ecom-api
   ```

2. **Install dependencies with pnpm**  
   ```bash
   pnpm install
   ```

3. **Create a `.env` file** at the project root with:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=xxx
   CLOUDINARY_API_KEY=xxx
   CLOUDINARY_API_SECRET=xxx
   ```

4. **Start the server**  
   ```bash
   pnpm start
   ```
   The API will run on `http://localhost:5000`.

---

## 📦 Available Scripts

| Command      | Description                            |
| ------------ | -------------------------------------- |
| `pnpm start` | Run the production server              |
| `pnpm test`  | Run Jest & Supertest integration tests |

---

## 🔍 API Endpoints

### Auth  
- `POST /api/auth/register` — Register new user  
- `POST /api/auth/login` — Login, returns JWT  

### Products  
- `GET  /api/products` — List all products  
- `POST /api/products` — **Admin only**: Create product (with image upload)  

### Categories  
- `GET  /api/categories` — List all categories  
- `POST /api/categories` — **Admin only**: Create category  

### Cart  
- `GET  /api/cart` — Get current user’s cart  
- `POST /api/cart` — Add item to cart  

### Orders  
- `POST /api/orders` — Create a new order  
- `GET  /api/orders` — List your own orders  
- `GET  /api/admin/orders` — **Admin only**: List all orders  

### Webhook  
- `POST /api/webhook/payment` — Fictitious payment webhook endpoint  

---

## 🗂️ Project Structure

\`\`\`
ecom-api/
├── config/           # DB + Cloudinary setup
├── controllers/      # Route handlers
├── middleware/       # JWT auth + role checks
├── models/           # Mongoose schemas
├── routes/           # Express routers
├── tests/            # Jest & Supertest
├── uploads/          # Multer temp uploads
├── .env              # Environment variables
├── .gitignore
├── pnpm-lock.yaml
├── package.json
└── index.js          # App entrypoint
\`\`\`

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/xyz`)  
3. Commit your changes (`git commit -m "feat: ..."`)  
4. Push to the branch (`git push origin feature/xyz`)  
5. Open a Pull Request  

---

## 📄 License

This project is licensed under the MIT License.
