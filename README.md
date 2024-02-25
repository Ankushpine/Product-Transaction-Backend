# Product-Transaction-Backend
 
The product transaction backend, crafted using Node.js and MongoDB, ensures smooth handling of transactions. All error cases are carefully managed, guaranteeing a hassle-free experience for users. APIs are fetched seamlessly, bringing in data accurately and efficiently. 

- Product details are fetched from the given APIs as soon as the server starts.
- For the database, MongoDB is used.

### Hosted Link : [Link](https://product-transaction-backend.onrender.com)

### There are a total of 5 APIs available:

### 1. Transactions API:
API Link  -  [Link](https://product-transaction-backend.onrender.com/api/transactions/?page=2)

- To get all transactions with pagination.
- Each page displays 10 product details.
- Users can add '/?page=2' as query params to navigate to the desired page.
-  Users can add '/?search=329.85' as query param for title/description/price, and based on matching results, it will return the product transactions.
- If every query params is empty, it will return all product transactions.

### 2. Statistics API:
API Link   -  [Link](https://product-transaction-backend.onrender.com/api/statistics/?month=April)

- To get the total sale amount, the number of sold items, and the number of unsold items for the selected month.
- Users have to add '/?month=April' as query param to select the month.
- The first letter of the month should be capitalized, such as 'January, February, ...  
- Otherwise, error cases are properly handled.


### 3. Price Range API:
API  Link   -  [Link](https://product-transaction-backend.onrender.com/api/pricerange/?month=April)
 
- To get the price range and the number of items within that range for the selected month
- Users have to add '/?month=April' as query param to select the month.
- The first letter of the month should be capitalized, such as 'January, February, ...  
- Otherwise, error cases are properly handled.


### 4.Pie Chart API:
API Link    - [Link](https://product-transaction-backend.onrender.com/api/piechart/?month=April)

- To get the unique categories and the number of items within each category for the selected month
- Users have to add '/?month=April' as query param to select the month.
- The first letter of the month should be capitalized, such as 'January, February, ...  
- Otherwise, error cases are properly handled.

### 5. Combined API:
API   Link   -  [Link](https://product-transaction-backend.onrender.com/api/?month=April)

-To fetch the data from all three APIs: Transactions, Price Range, and Pie Chart.
- Users have to add '/?month=April' as query param to select the month.
- The first letter of the month should be capitalized, such as 'January, February, ...  
- Otherwise, error cases are properly handled.

### The Postman collection link is : [Postman Link](https://martian-escape-677270.postman.co/workspace/Product-Transactions~b5d773c2-6dbf-480f-aa08-adc1c23cb266/collection/28535484-0035c017-7d30-46ba-a6ca-251b22b44de4?action=share&creator=28535484)

## How to setup the project on local system
- Clone this project to your local system.
- Run `npm i` to install required dependencies.
- Run `npm start` to start the app.
- The app will be live on [http://localhost:5000](http://localhost:5000).

