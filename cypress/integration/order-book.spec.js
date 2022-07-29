describe('test order book',()=>{
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

    it('should calculate order book market price', function () {
        cy.get('[data-test="market-price"]').should('have.text', '≈ 20000.43');
    });

    it('should aggregate orders with 200 index', function () {
        cy.get('select').select('200');
        cy.get('[data-test="single-order-sell-0"] > :nth-child(2)').should('have.text', '4000.03');
        cy.get('[data-test="single-order-buy-0"] > :nth-child(2)').should('have.text', '5180.00');
    });
})
