export const AggregateOrders = (orders, divider) => {
    let total = 0
    let last_price = undefined
    let orderBook = []
    const has_same_price = (price, last_price) => {
        return Math.floor(price / divider) * divider === last_price
    }
    if (divider) {
        orders.forEach(order => {
            if (has_same_price(order.price, last_price)) {
                let amount = Number(orderBook[orderBook.length - 1].amount) + Number(order.amount)
                total += Number(order.amount)
                orderBook[orderBook.length - 1] = {
                    price: Number(orderBook[orderBook.length - 1].price),
                    amount,
                    total
                }
            } else {
                total = Number(order.amount) + Number(total)
                last_price = Number(Math.floor(order.price / divider) * divider)
                orderBook.push({
                    amount: Number(order.amount),
                    price: last_price,
                    total
                })
            }
        })
        return orderBook
    } else {
            orders.forEach(order => {
            let price = +((order.price * 100).toFixed(2) / 100).toFixed(2)
            if (price === last_price) {
                let amount = Number(orderBook[orderBook.length - 1].amount) + Number(order.amount)
                total += Number(order.amount)
                orderBook[orderBook.length - 1] = {
                    amount,
                    price,
                    total
                }
            }else{
                total = Number(order.amount) + Number(total)
                orderBook.push({
                    amount: Number(order.amount),
                    price,
                    total
                })
            }
            last_price = price
        })
        return orderBook
    }
}