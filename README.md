# Student Store Starter Code
📝 `NOTE` Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

## Unit Assignment: Student Store

Submitted by: **Maria Perez**

Deployed Application (optional): [Student Store Deployed Site](ADD_LINK_HERE)

### Application Features

#### CORE FEATURES


- [x] **Database Creation**: Set up a Postgres database to store information about products and orders.
  - [x] Use the provided schema to create tables for `products`, `orders`, and `order_items`.
- [x] **Products Model**: Develop a model to represent individual items available in the store. 
  - [x] This model should include attributes such as `id`, `name`, `description`, `price`, `image_url`, and `category`.
  - [x] Implement methods for CRUD operations on products.
  - [x] Ensure transaction handling for the deletion of products to also delete related `order_items`
- [x]**Orders Model**: Develop a model to manage orders. 
  - [x] This model should include attributes such as `order_id`, `customer_id`, `total_price`, `status`, and `created_at`.
  - [x] Implement methods for creating, fetching, updating, and deleting orders.
  - [x] Ensure transaction handling for the deletion of orders to also delete related `order_items`
- [x] **Order Items Model**: Develop a model to represent the items within an order. 
  - [x] This model should include attributes such as `order_item_id`, `order_id`, `product_id`, `quantity`, and `price`.
  - [x] Implement methods for fetching and creating order items.
- [x] **API Endpoints**
  - [x] **Product Endpoints**:
    - [x] `GET /products`: Fetch a list of all products.
    - [x] `GET /products/:id`: Fetch details of a specific product by its ID.
    - [x] `POST /products`: Add a new product to the database.
    - [x] `PUT /products/:id`: Update the details of an existing product.
    - [x] `DELETE /products/:id`: Remove a product from the database.
  - [x] **Order Endpoints**:
    - [x] `GET /orders`: Fetch a list of all orders.
    - [x] `GET /orders/:order_id`: Fetch details of a specific order by its ID, including the order items.
    - [x] `POST /orders`: Create a new order with order items.
    - [x] `PUT /orders/:order_id`: Update the details of an existing order (e.g., change status).
    - [x] `DELETE /orders/:order_id`: Remove an order from the database.
- [x] **Frontend Integration**
  - [x] Connect the backend API to the provided frontend interface, ensuring dynamic interaction for product browsing, cart management, and order placement. Adjust the frontend as necessary to work with your API.


#### STRETCH FEATURES

- [ ] **Added Endpoints**
  - [ ] Create an endpoint for fetching all orders in the database.
  - [ ] Create an endpoint for serving an individual order based on its ID.
- [ ] **Filter Orders**
  - [ ] Allow users to use an input to filter orders by the email of the person who placed the order.
- [x] **Implement Your Own Frontend**
  - [x] Build your own user interface for browsing products, managing the shopping cart, and placing orders. This will involve integrating the frontend you create with the backend API you developed during the project.
- [ ] **Past Orders Page**
  - [ ] Build a page in the UI that displays the list of all past orders. The user should be able to click on any individual order to take them to a more detailed page of the transaction.


### Walkthrough Video

`TODO://` Add the embedded URL code to your animated app walkthrough below, <div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/45bf5ee64edd4ff482a304e8e17f305f?sid=e25c93b8-b2b6-45c5-82ae-8fa6a96ae237" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>. <div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/a5d25f1be15f4aadb6ad4b1bce68d46c?sid=f1a0be6f-86c3-4409-b3eb-b0117a42d9c1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>. <div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/3f96851f93df41ccb4a2ef50ecc26b76?sid=ba6f9354-4b17-4591-a014-66d977a11a0c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>. <div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/7ac49aff0cc24fa3a6bdb1f712f901d3?sid=134b46d1-85da-4ba0-8173-9b92169d68e7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>.  Make sure the video or gif actually renders and animates when viewing this README. (🚫 Remove this paragraph after adding walkthrough video)

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/45bf5ee64edd4ff482a304e8e17f305f?sid=e25c93b8-b2b6-45c5-82ae-8fa6a96ae237" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/a5d25f1be15f4aadb6ad4b1bce68d46c?sid=f1a0be6f-86c3-4409-b3eb-b0117a42d9c1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/3f96851f93df41ccb4a2ef50ecc26b76?sid=ba6f9354-4b17-4591-a014-66d977a11a0c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/7ac49aff0cc24fa3a6bdb1f712f901d3?sid=134b46d1-85da-4ba0-8173-9b92169d68e7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/7ac49aff0cc24fa3a6bdb1f712f901d3?sid=134b46d1-85da-4ba0-8173-9b92169d68e7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>



### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The topics discussed in the labs were helpful to completing the assignemnt by showing me how to connect front end with backend. I felt prepared to complete the project.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time I would add more products and implement pagination to be more effective when fetching the orders. I would have added additional features like a receipt page.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

It went well doing the crud functions for the backend. The things that did not went as planned were connecting the front end and black end until I finally figured it out. Something that my peer did that I would like to implement is the receipt orders.

### Open-source libraries used

- W3Schools.com.

### Shout out
Shout to Evelyn, Brendad, and Elizabeth and Devarsh.




