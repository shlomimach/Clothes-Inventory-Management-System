# Clothes-Inventory-Management-System
This project is a simple inventory management system for a clothing store built using Node.js, Express.js, and vanilla JavaScript for the front-end. The system allows users to view, add, and delete products from the inventory.


## Features

- **View Products**: Displays a list of all products in the inventory.
- **Add Product**: Allows adding a new product to the inventory.
- **Delete Product**: Allows deleting a product from the inventory by its ID.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **JSON**: Used for data storage and retrieval.
- **HTML & CSS**: Front-end structure and styling.
- **JavaScript**: Front-end logic for interacting with the server.

## Installation

1. **Clone the repository**:
   `` `bash
   git clone https://github.com/your-username/clothes-inventory-management.git
   cd clothes-inventory-management

Install dependencies:
npm install express cors jsonfile

Run the server:
node ServerExpress.js

Open the project in your browser:
Open index.html in your browser (you can use a live server extension for ease)


Endpoints
GET /products: Retrieves all products.
GET /products/:ProductId: Retrieves a specific product by ID.
POST /products: Adds a new product.
DELETE /products/:ProductId: Deletes a product by ID.

Usage
Viewing Products: Open the application in your browser to see the list of products.
Adding a Product: Fill out the form and click "Insert" to add a new product.
Deleting a Product: Enter the product ID and click "Delete" to remove a product from the inventory.

Project Structure
clothes-inventory-management/
├── Products.json       # JSON file for storing product data
├── ServerExpress.js    # Express server setup
├── index.html          # Front-end HTML file
├── Products.js         # Front-end JavaScript file
└── README.md           # Project documentation

Learnings and Insights
Setting up a Node.js server and using Express.js for routing.
Creating a REST API for CRUD operations.
Managing data with JSON.
Implementing front-end logic using vanilla JavaScript.
Styling a basic web application with CSS.
Contributions
Contributions, issues, and feature requests are welcome. Feel free to check the issues page.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Author
www.linkedin.com/in/shlomi-machluf-54b2a815b


   
