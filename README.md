# Online Book Store – Cypress Automation Framework

This project contains Cypress E2E automation tests for an Online Book Store web application.  
The application includes two main modules:

1. Customer site: View books, view details, purchase books  
2. Admin site: Add, Update, Delete books  

The project uses the Page Object Model (POM) structure.

---

## Folder Structure
```
project/
 ├── cypress/
 │    ├── tests/
 │    │     ├── TC_01_ViewDetailBook.js
 │    │     ├── TC_02_PurchaseBook.js
 │    │     └── TC_03_Admin_CRUD_Book.js
 │    ├── pages/
 │    │     ├── indexPage.js
 │    │     ├── bookDetails.js
 │    │     ├── cartOrder.js
 │    │     ├── checkOut.js
 │    │     ├── purchaseBook.js
 │    │     └── adminPage.js
 │    ├── demo_videos/
 │    │     ├── TC_02.gif
 │    ├── fixtures/
 │    └── support/
 │          ├── commands.js
 │          └── e2e.js
 ├── cypress.config.js
 ├── package.json
 └── README.md
```

---

# 1. View Detail of a Random Book

## Test Case: TC_01_ViewDetailBook

### Steps
1. Visit homepage: http://localhost/obs/  
2. Select a random book displayed on the homepage  
3. Verify the book detail page:
   - Breadcrumb is correct  
   - Book title matches the selected book  
   - Purchase / Add to cart button is visible  

### Expected Result
- User can view full detail of a randomly selected book  
- UI elements are correct and visible  

---

# 2. Guest Purchase a Book

## Test Case: TC_02_PurchaseBook

### Step 1: View Book Details (Reuse TC_01)
- Visit homepage  
- Select random book  
- Verify breadcrumb, title, and Add to Cart button  

### Step 2: Add to Cart
1. Click Purchase / Add to cart  
2. Verify:
   - Correct URL  
   - Book title  
   - Price  
   - Quantity  
   - Total  
   - Summary section  

### Step 3: Update Quantity
1. Change quantity  
2. Click Save Changes  
3. Verify:
   - Total is recalculated correctly  
   - Summary is updated  

### Step 4: Checkout
1. Click Go To Checkout  
2. Fill customer information form  
3. Click Purchase  
4. Verify Total including shipping (+20.00)

### Step 5: Payment
1. Fill payment form  
2. Click Purchase  
3. Verify success message is displayed:

"Your order has been processed successfully. We'll be reaching you out to confirm your order. Thanks!"

---

# 3. Admin: Add, Update, Delete a Book

## Admin Login
1. Visit homepage  
2. Click Login as Admin  
3. Enter admin credentials  
4. Click Submit  
5. Verify Logout link is displayed  

---

## a. Add a New Book
1. Click Add New Book  
2. Fill book information  
3. Click Save  

### Expected
- Message: "New Book has been added successfully"  
- New book appears in Book List  

---

## b. Update a Book
1. In Book List, click Edit on a random book  
2. Verify book information is displayed  
3. Update fields  
4. Click Update  

### Expected
- Message: "Book Details has been updated successfully"  
- Book list shows updated information  

---

## c. Delete a Book
1. In Book List, click Delete on a random book  
2. Confirm popup  

### Expected
- Book is removed from the list  

---

# Run Tests

## Open Cypress UI
```
yarn test
```

---

# Configuration (cypress.config.js)
```
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost/obs/",
    specPattern: "./cypress/tests/*"
  }
})
```

---

# Author
Steve Nguyen – QA Automation
