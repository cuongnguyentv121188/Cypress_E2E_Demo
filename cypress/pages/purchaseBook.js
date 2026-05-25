class purchaseBook {

    // Summary (last row)
    getTotalIncludingShipping = () => cy.get('table tr').last().find('th').eq(3);

    //get reverse 2 rows (fix)
    getSummaryRow = () => cy.get('table tr').last().prev().prev();
    getSummaryQuantity = () => this.getSummaryRow().find('th').eq(2);
    getSummaryTotal= () => this.getSummaryRow().find('th').eq(3);

    getCardNumber = () => cy.get('input[name="card_number"]');
    getCardPID = () => cy.get('input[name="card_PID"]');
    getCardName = () => cy.get('input[name="card_owner"]');
    getCardExpire = () => cy.get('input[name="card_expire"]');
    getCardType = () => cy.get('select[name="card_type"]');

    getPurchaseBtn = () => cy.get('button[type="submit"]');

    clickPurchaseBtn() {
        this.getPurchaseBtn().click();
    }
}
module.exports = new purchaseBook()