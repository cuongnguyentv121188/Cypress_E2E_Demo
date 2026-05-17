My local web aplication is a Online Book Store with lots of functions allowing customers viewing, purchasing their books. It also has a Book Managment System allowing Administrator managing the books with regarding actions: Add, Update and Delete.


Using POM model.
pages:
 |-indexPage.js 
 |-bookDetails.js
 tests
 |-TC_01_ViewDetailBook.js

We focus on 3 main functions for automation testing:

1/ Guest: View a detail Book
- visit link: http://localhost/obs/ successful
- select random a book displaying on the web application
- the detail information of the book is displayed 
-> Verify the breadcrumb, book title are correct + Purchase / Add to cart button is visible


2/ Guest: Purchase a Book
- visit link: http://localhost/obs/ successful
- select random a book displaying on the web application
- the detail information of the book is displayed 
-> Verify the information is correct + Purchase / Add to cart button is displayed
- click on Purchase / Add to cart button
- change to Quantity
- Click on Save Changes button  
-> Verify the Total is changed properly
- click on Go To Checkout button
- Fill the customer's information form completely
- Click on Purchase button 
-> Verify:
 + the Quantity is correct
 + the Total is changed by adding Shipping fee properly
- Fill the Payment form completely
- Click on Purchase button
-> Verify the purchase is completely by displaying the message:
"Your order has been processed sucessfully. We'll be reaching you out to confirm your order. Thanks!""


3/ Admin: Add/Update/Delete a Book
- visit link: http://localhost/obs/ successful
- click on Login as Admin link at the right bottom corner
- fill the Administrator account 
- click on Submit button
-> Verify the Login is successful (Logout link is displayed on the Top Menu)
  
a/ Add a new book
- Click on Add New Book link on the Top Menu
- Fill the Book's information 
- Click on Save button
-> Verify 
 + The message is displayed: "New Book has been added successfully"
 + the Book is added successful into a Book List

b/ Update the book's information
- on the Book List screen, click on Edit button at Action column of a random book
-> Verify the book's information is displayed correctly
- Update book's information
- Click on Update button
-> Verify 
 + The message is displayed: "Book Details has been updated successfully"
 + the Book is added successful into a Book List with the updated information

c/ Delete a book
- on the Book List screen, click on Delete button at Action column of a random book
- click OK button on the Popup
-> Verify the book is deleted
