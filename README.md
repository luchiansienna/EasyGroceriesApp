# Easy Groceries App

Here is the code base for the 2 apps:

Web Typescript React UI App: https://github.com/luchiansienna/EasyGroceriesApp.git

.Net Core API Application: https://github.com/luchiansienna/EasyGroceriesAPI.git


Before starting the web server, the 'npm install' command needs to be run.
I also attached an .env file with the API link variable. 
This needs to be put in the root folder of the web app before starting the web server ( hitting 'npm start' on the command line).

There are a list of products there, and I used SQLLite as a database, although this can be changed.
The user is able to add products to the basket, go to check out by pressing the top right button.
On the checkout page, products can be removed from the basket, or updated with a different quantity.
The shipping details must be filled, and the order can be placed by pressing the bottom 'Order' button.
If validation passes, the shipping slip is being shown. 
The order, order items and all details relating to the order are being added to the sqllite database.
By pressing the bottom button, a new process of making a new order can be started.

Unit tests have been added on the front side with JEST and React unit testing library, 
as well as on the back end with NUnit.

On the API I have used Dependency Injection at making the UnitWork for accessing the database.

In the business layer, the order processor has been made flexible with loose connections being provided in the constructor and binded at the run-time.
Validation has been added also on the back end, with ValidatorOrderProcessor.