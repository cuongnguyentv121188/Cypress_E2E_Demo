

class indexPage {

    getBookList = () => cy.get('#book_visual .book-item');

    getRandomBook(){
       return this.getBookList().then($listBook => {
            const count = $listBook.length;
            const randomIndex = Math.floor(Math.random() * count);
            return cy.wrap($listBook[randomIndex]);
        })
    }

    getBookTitle = (bookElement) => bookElement.find('.card-title').text().trim();

    clickRandomBook() {
        return this.getRandomBook().then(book => {
            cy.wrap(book).click();
            return cy.wrap(book); // get title from test file
        });
    }
}
module.exports = new indexPage()