import indexPage from '../pages/indexPage.js'
import detailPage from '../pages/bookDetails.js'
import cartOrder from '../pages/cartOrder.js'
import checkOut from '../pages/checkOut.js'
import purchaseBook from '../pages/purchaseBook.js';

describe('Purchase a book successful', () => {
    it('should be able to purchase a book', () => {
       
        //TC_01:
        //cy.wait(2000);
        cy.visit('http://localhost/obs/');
        let expectedTitle = "";
        let expectedPrice = 0;
        let expectedQuantity = 0;
        let uiTotal = 0;
        
        indexPage.clickRandomBook().then(book => {
            // get book title
            expectedTitle = indexPage.getBookTitle(book);
        });

        const round2 = (value) => Math.round(value * 100) / 100;
        //1.3 Verify in Detail screen: breadcrumb, book title, button
        cy.then(() => {
            detailPage.verifyBreadcrumb(expectedTitle);
            detailPage.verifyBookTitle(expectedTitle);
            detailPage.verifyAddToCartVisible();
            detailPage.getBookPrice()
                    .invoke('text')
                    .then(price => {
                        expectedPrice = round2(Number(price.trim()));
                    })
        });

        //2.1 click on Purchase / Add to cart button
        detailPage.clickAddToCartButton();
        // verify correct url
        cy.url().should('include', 'cart.php'); 
        //verify book Title
        cartOrder.getItemCell()
                .invoke('text')
                .then(text => {
                    expect(text.trim()).to.contains(expectedTitle, 'Verify the book Title');
                });
        //verify book Title
        cartOrder.getPriceCell()
                .invoke('text')
                .then(price => {
                    const uiPrice = round2(Number(price.replace('$','').trim()));
                    expect(uiPrice).to.eq(expectedPrice, 'Verify the book Price');
                });
        //get Quantity
        cartOrder.getQuantityInput()
                .invoke('val')
                .then(quan => {
                    expectedQuantity = Number(quan);
                    //cy.log(expectedQuantity);
                })
        //get UI Total
        cartOrder.getTotalCell()
                .invoke('text')
                .then(total => {
                    uiTotal = round2(Number(total.replace('$','').trim()));
                })
        //verify the UI Total is correct
        cy.then(() => {
            const expectedTotal = round2(expectedPrice * expectedQuantity);
            expect(expectedTotal).to.eq(uiTotal, 'Verify the Total')
        })

        //Verify Summary Quantity of total rows
        let SumQuan = 0;
        cartOrder.getItemRow().each(($row) => {
            cy.wrap($row).find('input')
                            .invoke('val')
                            .then(quan => {
                                SumQuan += Number(quan);
                            })

        })

        //compare with Summary Quantity
        cy.then(() => {
            cartOrder.getQuantitySummary()
                        .invoke('text')
                        .then((quan) => {
                            expect(Number(quan)).to.eq(SumQuan, 'Verify the Summary Quantity in Checkout');
                        })
        })


        //2.2 change the value of Quantity
        cartOrder.getQuantityInput().clear().type('3');
        //Click on Save Changes button 
        let newQuantity = 0;
        cartOrder.clickSaveChanges().then(() => {
            cartOrder.getQuantityInput()
                .invoke('val')
                .then(quan => {
                    newQuantity = Number(quan);
                    //cy.log(newQuantity);
                })
            cartOrder.getTotalCell()
                .invoke('text')
                .then(total => {
                    uiTotal = round2(Number(total.replace('$','').trim()));
                })
        })
        //Verify the Total is changed properly
        cy.then(() => {
            const newTotal = round2(Number(expectedPrice * newQuantity));
            expect(newTotal).to.eq(uiTotal, 'Verify new Total is changed')
        })

        //Verify Summary Total of total rows
        let SumTotal = 0;
        cartOrder.getItemRow().each(($row) => {
            cy.wrap($row).find('td').eq(3)
                            .invoke('text')
                            .then(total => {
                                SumTotal += Number(total.replace('$','').trim());
                            })
        })

        //compare with Summary Total
        cy.then(() => {
            cartOrder.getTotalSummary()
                        .invoke('text')
                        .then((total) => {
                            expect(Number(total.replace('$','').trim())).to.eq(SumTotal, 'Verify the Summary Total in Checkout');
                        })
        })

        //2.3 click on Go To Checkout button
        cartOrder.clickCheckOut();
        //Fill customer's information and click Purchase button
        cy.url().should('include', 'checkout.php'); 
        checkOut.getCustomerName().type('Quoc Cuong Nguyen');
        checkOut.getAddress().type("226 Akhtar Bend");
        checkOut.getCityName().type("Saskatoon, Saskatchewan");
        checkOut.getZipcode().type("S7W 0X3");
        checkOut.getCountryName("Canada")

        checkOut.clickPurchaseBtn();

        //2.4 Verify the Total including shipping (+20.00)
        cy.url().should('include', 'purchase.php');
        purchaseBook.getSummaryQuantity()
                    .invoke('text')
                    .then(quan => {
                        const PaymentQuan = Number(quan.trim());
                        expect(PaymentQuan).to.eq(newQuantity, 'Verify the Summary Quantity in Payment');
                    })
        
        let totalShip = 0;

        purchaseBook.getSummaryTotal()
                    .invoke('text')
                    .then(total => {
                        const PaymentTotal = round2(Number(total.replace('$','').trim()));
                        totalShip = Number(PaymentTotal) + 20;
                        expect(PaymentTotal).to.eq(SumTotal, 'Verify the Summary Total in Payment');
                    })
        
        
        purchaseBook.getTotalIncludingShipping()
                    .invoke('text')
                    .then(totalship => {
                        expect(Number(totalship.replace('$','').trim())).to.eq(totalShip, 'Verify the Total Including Shipping');
                    })

        //2.5 Fill the Payment form completely
        // Click on Purchase button
        purchaseBook.getCardType().select("MasterCard");
        purchaseBook.getCardNumber().type("0123 4567 8912 0011");
        purchaseBook.getCardPID().type("987654");
        purchaseBook.getCardExpire().type("2030-12-12");
        purchaseBook.getCardName("Quoc Cuong Nguyen");
        purchaseBook.clickPurchaseBtn();

        //-> Verify the purchase is completely by displaying the message:
        //"Your order has been processed sucessfully. We'll be reaching you out to confirm your order. Thanks!""
        cy.url().should('include','process.php');
        cy.contains("Your order has been processed sucessfully. We'll be reaching you out to confirm your order. Thanks!")
            .should('be.visible')
                .then($el => {
                    const text = $el.text().trim();
                    expect(text).to.contain("Your order has been processed sucessfully. We'll be reaching you out to confirm your order. Thanks!");
                })
        //cy.get('body').should('contain.text', "Your order has been processed sucessfully");
    });
});