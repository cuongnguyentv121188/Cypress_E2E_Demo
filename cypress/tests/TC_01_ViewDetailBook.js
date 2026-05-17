import indexPage from '../pages/indexPage.js';
import detailPage from '../pages/bookDetails.js'


describe('View a detail of a random book', () => {
    it('should be able to view detail of a random book', () => {
        /*1/ Guest: View a detailed Book
        1.1 visit link: http://localhost/obs/ successful
        1.2 select random a book displaying on the web application
        1.3 the detail information of the book is displayed 
        -> Verify the breadcrumb, book title are correct + Purchase / Add to cart button is visible */
        
        //1.1
        cy.visit("http://localhost/obs");
       /* 
        //1.2 random click + get title 
        let bookTitle = "";
        cy.get('#book_visual .book-item').then($listBook => {
            const count = $listBook.length;
            const randomIndex = Math.floor(Math.random() * count);
            const randomBook = $listBook[randomIndex];

            cy.wrap(randomBook)
                .find('.card-title')
                .invoke('text')
                .then((title) => {
                bookTitle = title.trim();
                //cy.log(bookTitle)
            })
            
            cy.wrap($listBook[randomIndex]).click();
        })

        //1.3 Verify in Detail screen: breadcrumb, book title, button
        cy.get('#breadcrumb_title').invoke('text').then((breadcrumb_text) => {
            expect(breadcrumb_text.trim()).to.eq(bookTitle, 'Verify the breadcrum');
        })
        cy.get('.container-fluid > h4').eq(0)
            .invoke('text')
            .then((book_title) => {
                expect(book_title.trim()).to.eq(bookTitle,'Verify the Book Title');
            });
        cy.get('input[name="cart"]').should('be.visible'); */

        //1.2 random click + get title applied POM
        let expectedTitle = "";

        indexPage.clickRandomBook().then(book => {
            // get book title
            expectedTitle = indexPage.getBookTitle(book);
        });

        //1.3 Verify in Detail screen: breadcrumb, book title, button
        cy.then(() => {
            detailPage.verifyBreadcrumb(expectedTitle);
            detailPage.verifyBookTitle(expectedTitle);
            detailPage.verifyAddToCartVisible();
        });

    });
});
