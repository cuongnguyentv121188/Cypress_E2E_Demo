class checkOut {

    getCustomerName = () => cy.get('input[name="name"]');
    getAddress = () => cy.get('input[name="address"]');
    getCityName = () => cy.get('input[name="city"]');
    getZipcode = () => cy.get('input[name="zip_code"]');
    getCountryName = () => cy.get('input[name="country"]');

    getPurchaseBtn =() => cy.get('input[value="Purchase"]');

    clickPurchaseBtn() {
        this.getPurchaseBtn().click();
    }
}
module.exports = new checkOut()