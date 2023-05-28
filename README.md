# Inventory Management System
The Inventory Management System is a web application that allows users to manage and track inventory items. It provides features for adding new items, updating existing items, adjusting stock quantities, and deleting items from the inventory.

## Features

- Add new items to the inventory
- Update existing items in the inventory
- Adjust stock quantities of items
- Delete items from the inventory
- View all items in the inventory
- Filtering Based on Low stock and low stock warning


## Technologies

The following technologies are used in this project:

- Frontend: React, Material UI
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB
- State Management: Redux
- Middleware: Saga


## How to run this project locally


### Installation

- Clone the repository to your local machine:
```bash
git clone https://github.com/nareshkumaralaria/book-inventory-management.git

```
- Navigate to the project directory:
```bash
cd book-inventory-management

```
#### Install frontend dependencies
- Navigate to the frontend directory:
```bash
cd frontend
npm install

```
#### Install backend dependencies
- Navigate to the frontend directory:
```bash
cd ../backend
npm install

```


### Set up the database
- login or singup to https://www.mongodb.com/
- Create a MongoDB database for the project

### Configure the backend
- Create a .env file in the backend directory and provide the following environment variables:

```bash
ADMIN_USERNAME=<YOUR_MONGODB_CLUSTER_USERNAME>
ADMIN_PASSWORD=<YOUR_MONGODB_CLUSTER_PASSWORD>
```

Replace `<YOUR_MONGODB_CLUSTER_USERNAME>`, `<YOUR_MONGODB_CLUSTER_PASSWORD>` with the name of your MongoDB cluster username and password.

### Usage
- Start the backend server
```bash
cd backend
npm start

```
- Start the frontend development server
```bash
cd frontend
npm start

```

### Access the application in your web browser

- Open http://localhost:5173 to view the application.

- Use the provided features to manage the inventory items.


## Live Link

https://solar-naresh.netlify.app/


## Authors

- [@nareshkumaralaria](https://github.com/nareshkumaralaria) (Naresh Kumar)


## Screenshots

Home Page
![HomePage](https://github.com/nareshkumaralaria/book-inventory-management/assets/57484597/a2a11661-ec76-4e9c-ac68-20ffd0986641)

Add Item To Inventory
![Add Item To Inventory](https://github.com/nareshkumaralaria/book-inventory-management/assets/57484597/66ac5e96-1d0e-499a-9a91-e9690fa657cc)

Adjust Stock
![Adjust Stock](https://github.com/nareshkumaralaria/book-inventory-management/assets/57484597/f474d793-dd4c-4ba7-b612-64b5d0b5c558)
