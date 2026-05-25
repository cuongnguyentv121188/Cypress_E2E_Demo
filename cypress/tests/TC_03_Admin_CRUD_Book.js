import adminPage from '../pages/adminPage.js'
import adminBook from '../pages/adminBook.js'
import adminAddBook from '../pages/adminAddBook.js'
import adminEditBook from '../pages/adminEditBook.js'

describe('Test case 03 of CRUD of Admin', () => {
    it('Should be able to CRUD a book with Admin role', () => {

        //visit Login page
        cy.visit('http://localhost/obs/admin.php');
        // Enter Admin credential
        adminPage.getUsername().type("admin");
        adminPage.getPassword().type("admin123");
        //click Submit button
        adminPage.clickSubmitBtn();

        //Verify Logout link is displayed  
        cy.url().should('include','admin_book.php');

        //Verify Logout link is visible
        adminBook.getLogoutLink().should('be.visible');
        //Add a new book
        adminBook.clickAddNewBookLink();
         //Verify Add New Book link is displayed  
        const randomISBN = String(Math.floor(Math.random() * 10000));
        cy.url().should('include','admin_add.php');
        adminAddBook.getISBNBook().type(randomISBN);
        adminAddBook.getTitleBook().type("Random Book 1");
        adminAddBook.getAuthorBook().type("Author 1");
        adminAddBook.getDescription().type("Description 1");
        adminAddBook.getPriceBook().type("15.20");
        adminAddBook.getPublisherBook().select("Publisher 2");
        //upload image
        adminAddBook.uploadImage('cypress/images/wildlife_advanture.jpg', 'wildlife_advanture.jpg', 'image/jpeg');

        //click Save button
        adminAddBook.clickSaveBtn();

        //Verify the text "New Book has been added successfully" 
        cy.url().should('include','admin_book.php');
        cy.contains("New Book has been added successfully")
                .should('be.visible')
                .then($el => {
                    const text = $el.text().trim();
                    expect(text).to.contain("New Book has been added successfully");
                })
        
        //verify Book is created successful in the table, ISBN is unique
        adminBook.getRowByISBN(randomISBN).then(row => {
            expect(row.find('td').eq(0).text().trim()).to.eq(randomISBN,'Verify the ISBN of created book');
            adminBook.getEditLinkInRow(row).click(); //click Edit link
        })

        //Update book's information
        adminEditBook.getTitleBook().clear().type("Update Title 1");
        adminEditBook.getAuthorBook().clear().type("Update Author 1");
        adminEditBook.getDescription().clear().type("Update Description 1");
        adminEditBook.getPriceBook().clear().type("22.22");
        adminEditBook.getPublisherBook().select("Publisher 1");

        //Click on Update button
        adminEditBook.clickUpdateBtn();
        //Verify the text "Book Details has been updated successfully" 
        cy.url().should('include','admin_book.php');
        cy.contains("Book Details has been updated successfully")
                .should('be.visible')
                .then($el => {
                    const text = $el.text().trim();
                    expect(text).to.contain("Book Details has been updated successfully");
                })

        adminBook.getRowByISBN(randomISBN).then(row => {
            adminBook.getDeleteLinkInRow(row).click(); //click Delete link
        })
        //Click OK on Confirm Popup
        cy.on('window:confirm', () => true);
        //Verify the deleted book is not visible
        cy.contains('table.table tbody tr', randomISBN, { timeout: 0 })
            .should('not.exist');

    });   
});