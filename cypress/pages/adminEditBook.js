class adminEditBook {

    getTitleBook = () => cy.get('input[name="book_title"]');   
    getAuthorBook = () => cy.get('input[name="book_author"]');  
    
    getDescription = () => cy.get('textarea[name="book_descr"]');
    getPriceBook = () => cy.get('input[name="book_price"]');  
    getPublisherBook = () => cy.get('select[name="publisherid"]');  


    getUpdateButton = () => cy.get('button[name="edit"]');

    clickUpdateBtn() {
        this.getUpdateButton().click();
    }

}
module.exports = new adminEditBook()