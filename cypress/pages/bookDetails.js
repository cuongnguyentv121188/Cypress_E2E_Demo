class bookDetails{
    getBreadcrumbTitle = () => cy.get('#breadcrumb_title');
    getBookTitle = () => cy.get('.container-fluid > h4').eq(0);
    getAddToCartButton = () => cy.get('input[name="cart"]');

    verifyBreadcrumb(expectedTitle) {
        this.getBreadcrumbTitle()
            .invoke('text')
            .then(text => {
                expect(text.trim()).to.eq(expectedTitle, 'Verify the breadcrumb');
            });
    }

    verifyBookTitle(expectedTitle) {
        this.getBookTitle()
            .invoke('text')
            .then(text => {
                expect(text.trim()).to.eq(expectedTitle, 'Verify the Book Title');
            });
    }

    verifyAddToCartVisible() {
        this.getAddToCartButton().should('be.visible');
    }

}
module.exports = new bookDetails()