class adminAddBook {

    getISBNBook = () => cy.get('input[name="isbn"]');    
    getTitleBook = () => cy.get('input[name="title"]');   
    getAuthorBook = () => cy.get('input[name="author"]');  
    
    getDescription = () => cy.get('textarea[name="descr"]');
    getPriceBook = () => cy.get('input[name="price"]');  
    getPublisherBook = () => cy.get('select[name="publisher"]');  

    getImageBook = () => cy.get('input[name="image"]');

    uploadImage(filePath, fileName, mimeType) {
            cy.readFile(filePath, 'base64').then(fileContent => {
            //cy.log("FILE CONTENT:", fileContent); 
            this.getImageBook().attachFile(
                { fileContent, fileName, mimeType, encoding:'base64' },
                { uploadType: 'input' }
            );
        });
    }

    getSaveButton = () => cy.get('button[name="add"]');

    clickSaveBtn() {
        this.getSaveButton().click();
    }

}
module.exports = new adminAddBook()