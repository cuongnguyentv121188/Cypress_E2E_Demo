class adminBook{

    getAddNewBookLink = () => cy.get('a.nav-link[href="admin_add.php"]');
    getLogoutLink = () => cy.get('a.nav-link[href="admin_signout.php"]');

    clickAddNewBookLink() {
        this.getAddNewBookLink().click();
    }

    clickLogoutLink() {
        this.getLogoutLink().click();
    }

    //get all rows of the table
    getTableRows = () =>  cy.get('table.table tbody tr');

    getRowByISBN = (isbn) => cy.contains('table.table tbody tr', isbn);
    getCellInRow = (row, index) => row.find('td').eq(index);

    getEditLinkInRow = (row) => cy.wrap(row).find('a[title="Edit"]');
    getDeleteLinkInRow = (row) => cy.wrap(row).find('a[title="Delete"]');


}
module.exports = new adminBook()