class adminPage {

    getUsername = () => cy.get('input[name="name"]');
    getPassword = () => cy.get('input[name="pass"]');

    getSubmitBtn = () => cy.get('input[name="submit"]');

    clickSubmitBtn() {
        this.getSubmitBtn().click();
    }

}
module.exports = new adminPage()