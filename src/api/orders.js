import {Api} from "@/api/index";

export const getOrders = async () => {
    return await Api.get('/orders')
}

export const storeOrder = async (payload) => {
    return await Api.post('/orders',payload)
}