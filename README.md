# 🛒 ecom‑api

A simple e‑commerce REST API built with **Node.js**, **Express**, **MongoDB**, and **Cloudinary**.  
It provides JWT‑based authentication, role‑based authorization, image uploads, basic cart & order
management, and a payment‑webhook stub.

---

## 🛠️ Prerequisites

- **Node.js ≥ 18**
- **pnpm ≥ 8**
- A **MongoDB** connection string (e.g. MongoDB Atlas)
- A **Cloudinary** account for image uploads

---

## 🚀 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/Morg9864/ecom-api.git
   cd ecom-api
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create a `.env` file** at the project root:

   ```env
   PORT=5000
   MONGODB_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=xxx
   CLOUDINARY_API_KEY=xxx
   CLOUDINARY_API_SECRET=xxx
   ```

4. **Start the server**

   ```bash
   pnpm start
   ```

   The API will be running on <http://localhost:5000>.

---

## 📦 Available Scripts

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `pnpm start`   | Run the server in production mode   |
| `pnpm dev`     | Run the server with hot‑reloading   |
| `pnpm test`    | Run Jest + Supertest integration tests |

---

## 🔍 API Endpoints

### Auth

| Method | Path                | Description              |
| ------ | ------------------- | ------------------------ |
| POST   | `/api/auth/register`| Register a new user      |
| POST   | `/api/auth/login`   | Log in and receive a JWT |

### Products

| Method | Path            | Description                                      |
| ------ | --------------- | ------------------------------------------------ |
| GET    | `/api/products` | List all products                                |
| POST   | `/api/products` | **Admin only** – create a product with image     |

### Categories

| Method | Path               | Description                       |
| ------ | ------------------ | --------------------------------- |
| GET    | `/api/categories`  | List all categories               |
| POST   | `/api/categories`  | **Admin only** – create category  |

### Cart

| Method | Path         | Description              |
| ------ | ------------ | ------------------------ |
| GET    | `/api/cart`  | Retrieve current cart    |
| POST   | `/api/cart`  | Add an item to the cart  |

### Orders

| Method | Path                 | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/orders`        | Create a new order                       |
| GET    | `/api/orders`        | List your own orders                     |
| GET    | `/api/admin/orders`  | **Admin only** – list all orders         |

### Webhook

| Method | Path                     | Description                        |
| ------ | ------------------------ | ---------------------------------- |
| POST   | `/api/webhook/payment`   | Stub for payment‑provider webhook  |

---

## 🗂️ Project Structure

```text
ecom-api/
├── config/           # Database & Cloudinary setup
├── controllers/      # Route handlers
├── middleware/       # JWT auth & role checks
├── models/           # Mongoose schemas
├── routes/           # Express routers
├── tests/            # Jest & Supertest suites
├── uploads/          # Multer temp uploads
├── .env              # Environment variables (not committed)
├── .gitignore
├── pnpm-lock.yaml
├── package.json
└── index.js          # App entrypoint
```

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/xyz`)  
3. Commit your changes (`git commit -m "feat: ..."`)  
4. Push to your branch (`git push origin feature/xyz`)  
5. Open a Pull Request

---

## 📄 License

Licensed under the **MIT License**. See `LICENSE` for details.
