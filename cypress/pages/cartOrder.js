class cartOrder {

    // get first item (not header)
    getItemCell = () => cy.get('table tr').eq(1).find('td').eq(0);
    getPriceCell = () => cy.get('table tr').eq(1).find('td').eq(1);
    getQuantityCell = () => cy.get('table tr').eq(1).find('td').eq(2);
    getTotalCell = () => cy.get('table tr').eq(1).find('td').eq(3);

    //get item rows (not Header, not Summary)
    getItemRow = () => cy.get('table tr').not(':first').not(':last');

    // Summary (last row)
    getQuantitySummary = () => cy.get('table tr').last().find('th').eq(2);
    getTotalSummary = () => cy.get('table tr').last().find('th').eq(3);


    getQuantityInput() {
        return this.getQuantityCell().find('input');
    }

    clickSaveChanges() {
        return cy.get('input[name="save_change"]').click();
    }

    clickCheckOut() {
        return cy.get('a[href="checkout.php"]').click();
    }

}
module.exports = new cartOrder()