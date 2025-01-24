# Optical Shop Management Project

This project is a **web-based application** designed to streamline and enhance the experience of managing and shopping for optical products. It provides functionalities for customers to browse products, manage their accounts, and receive notifications, while administrators can handle product inventory, orders, and real-time updates.

---

## Features

### **User Features**
- **Authentication & Account Management**
  - User registration and login with JWT-based authentication.
  - Password encryption using bcrypt.
  - Profile management, including updating user details and profile pictures.

- **Product Browsing**
  - View all products with filters for category, price range, and more.
  - View product details, including images, descriptions, and stock availability.

- **Wishlist Management**
  - Add, view, and remove products from the wishlist.
  - Clear the entire wishlist.

- **Cart Management**
  - Add products to the cart and adjust quantities.
  - View and clear the cart.

- **Order Management**
  - Place orders with shipping details.
  - View order history and order details.
  - Cancel orders if eligible.

- **Review System**
  - Add, edit, and delete product reviews.
  - View reviews for individual products.

- **Notifications**
  - Real-time notifications for orders, promotions, and system updates.
  - Mark notifications as read or clear all notifications.

### **Admin Features**
- Manage product inventory (add, update, delete products).
- Manage orders (update order status, view all orders).
- Real-time admin dashboard with updates on orders and notifications using Socket.IO.

---

## Tech Stack

### **Frontend**
- **React.js**
  - Component-based UI design.
  - Axios for API communication.
- **TailwindCSS** for responsive styling.
- **Socket.IO** for real-time updates.

### **Backend**
- **Node.js** with **Express.js**
  - RESTful API architecture.
  - Authentication using JWT.
- **MongoDB** with **Mongoose**
  - NoSQL database for storing users, products, orders, and notifications.

### **Other Tools**
- **Bcrypt** for password hashing.
- **Dotenv** for managing environment variables.
- **Cors** for handling cross-origin requests.

---

## Installation

### **1. Prerequisites**
- Node.js installed on your machine.
- MongoDB instance running locally or on the cloud.

### **2. Clone the Repository**
```bash
https://github.com/your-repo/optical-shop.git
cd optical-shop
```

### **3. Install Dependencies**
#### Backend:
```bash
cd backend
npm install
```
#### Frontend:
```bash
cd frontend
npm install
```

### **4. Set Up Environment Variables**
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

### **5. Run the Application**
#### Start the Backend:
```bash
cd backend
npm start
```
#### Start the Frontend:
```bash
cd frontend
npm start
```

### **6. Open in Browser**
The application should now be running at:
```
http://localhost:3000
```

---

## API Endpoints

### **User Routes**
- **POST** `/api/users/register`: Register a new user.
- **POST** `/api/users/login`: Log in a user.
- **GET** `/api/users/profile`: Get the current user's profile.
- **PATCH** `/api/users/profile`: Update user profile.

### **Product Routes**
- **GET** `/api/products`: Get all products with optional filters.
- **GET** `/api/products/:id`: Get product details by ID.

### **Cart Routes**
- **GET** `/api/cart`: Get user's cart details.
- **POST** `/api/cart/add`: Add a product to the cart.
- **DELETE** `/api/cart/remove/:productId`: Remove a product from the cart.

### **Order Routes**
- **POST** `/api/orders`: Place an order.
- **GET** `/api/orders`: Get order history.
- **GET** `/api/orders/:id`: Get order details.

### **Notification Routes**
- **GET** `/api/notifications/:userId`: Get all notifications for a user.
- **PATCH** `/api/notifications/:notificationId/read`: Mark a notification as read.
- **PATCH** `/api/notifications/:userId/read-all`: Mark all notifications as read.
- **DELETE** `/api/notifications/clear/:userId`: Clear all notifications.

---

## Future Enhancements
- Add search functionality with autocomplete.
- Implement payment gateway integration.
- Introduce analytics for admin dashboard.
- Add browser push notifications.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contributors
- [Your Name](https://github.com/your-profile)

