import {mount} from '@vue/test-utils'
import OrderEntry from "@/components/orderEntry/OrderEntry";

describe('test order-book component', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(OrderEntry, {
                global:{
                    mocks:{
                        emitter: {
                            on: jest.fn()
                        }
                    }
                }
        })
    })

    test('renders the order-entry component', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.element.classList).toContain('order-entry-container')
        expect(wrapper.text()).toContain('Order Entry')
    })

    it('check sell order form validation works', async () => {
        const sellOrderForm = wrapper.find('[data-test="sell-order-form"]')
        const sellOrderSubmit = wrapper.find('[data-test="sell-order-submit"]')
        await sellOrderSubmit.trigger('click')
        expect(sellOrderForm.html()).toContain('The price is required')
        expect(sellOrderForm.html()).toContain('The amount is required')
    })

    it('check buy order form validation works', async () => {
        const buyOrderForm = wrapper.find('[data-test="buy-order-form"]')
        const buyOrderSubmit = wrapper.find('[data-test="buy-order-submit"]')
        await buyOrderSubmit.trigger('click')
        expect(buyOrderForm.html()).toContain('The price is required')
        expect(buyOrderForm.html()).toContain('The amount is required')
    })
})