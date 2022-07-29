describe('test order entry',()=>{
    beforeEach(()=>{
        cy.server()
        cy.route({
            method: 'GET',
            url: 'http://localhost:8080/orders',
            status: 200,
            response: require(`../mocks/api/orders.json`)
        })

        cy.visit('http://localhost:3000')
    })

    it('should show input validation errors', function () {
        cy.get('[data-test="buy-order-submit"]').click();
        cy.get('[data-test="sell-order-submit"]').click();
        cy.get('[data-test="buy-order-price-input"] > .th-input__message').should('have.text', 'The price is required');
        cy.get('[data-test="buy-order-amount-input"] > .th-input__message').should('have.text', 'The amount is required');
        cy.get('[data-test="sell-order-price-input"] > .th-input__message').should('have.text', 'The price is required');
        cy.get('[data-test="sell-order-amount-input"] > .th-input__message').should('have.text', 'The amount is required');
    });

    it('should add sell order to order book', function () {
        cy.route({
            method: 'POST',
            url: 'http://localhost:8080/orders',
            status: 200,
            response: {
                order: {amount: "100", price: "20050", side: "sell", id: 1},
                result: "inserted"
            }
        })
        cy.get('[data-test="sell-order-price-input"] > .th-input__control > .th-input').clear();
        cy.get('[data-test="sell-order-price-input"] > .th-input__control > .th-input').type('20050');
        cy.get('[data-test="sell-order-amount-input"] > .th-input__control > .th-input').clear();
        cy.get('[data-test="sell-order-amount-input"] > .th-input__control > .th-input').type('100');
        cy.get('[data-test="sell-order-submit"]').click();

        cy.get('[data-test="single-order-sell-5"] > :nth-child(2)').should('have.text', '159.58');

    });


    it('should add buy order to order book', function () {
        cy.route({
            method: 'POST',
            url: 'http://localhost:8080/orders',
            status: 200,
            response: {
                order: {amount: "200", price: "19980", side: "buy", id: 2},
                result: "inserted"
            }
        })
        cy.get('[data-test="buy-order-price-input"] > .th-input__control > .th-input').clear();
        cy.get('[data-test="buy-order-price-input"] > .th-input__control > .th-input').type('19980');
        cy.get('[data-test="buy-order-amount-input"] > .th-input__control > .th-input').clear();
        cy.get('[data-test="buy-order-amount-input"] > .th-input__control > .th-input').type('200');

        cy.get('[data-test="buy-order-submit"]').click();

        cy.get('[data-test="single-order-buy-1"] > :nth-child(2)').should('have.text', '488.03');

    });
})
