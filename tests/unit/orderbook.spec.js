import {mount} from '@vue/test-utils'
import OrderBook from "@/components/orderbook/OrderBook";

const orders = [
    {id: 1, side: 'buy', amount: 10, price: 1000},
    {id: 2, side: 'buy', amount: 20, price: 1010},
    {id: 3, side: 'sell', amount: 15, price: 999},
    {id: 4, side: 'buy', amount: 30, price: 1000.5},
    {id: 5, side: 'sell', amount: 25, price: 980},
    {id: 6, side: 'sell', amount: 35, price: 850},
]

describe('test order-book component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(OrderBook, {
            props: {
                orders
            },
        })
    })

    test('renders the order-book component', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.element.classList).toContain('order-book-container')
        expect(wrapper.text()).toContain('Order Book')
    })

    test('check the market price has value', () => {
        const marketPrice = wrapper.find('[data-test="market-price"]')
        expect(marketPrice.text()).toContain('930.00')
    })

    test('check the buy order list contains orders', async () => {

        const buyOrderList = wrapper.findAll('[data-test="buy-order-list"]')
        expect(buyOrderList).toHaveLength(1)

        const singleOrderBuy = wrapper.findAll('[data-test^="single-order-buy-"]')
        expect(singleOrderBuy).toHaveLength(2) // the aggregator is 10


    })

    test('check the sell order list contains orders', () => {
        const sellOrderList = wrapper.findAll('[data-test="buy-order-list"]')
        expect(sellOrderList).toHaveLength(1)

        const singleOrderSell= wrapper.findAll('[data-test^="single-order-sell-"]')
        expect(singleOrderSell).toHaveLength(3)
    })
})