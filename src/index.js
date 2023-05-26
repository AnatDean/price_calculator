exports.calculator = (basket) => {
    return basket.reduce((total, item) => {
        const currentTotal = +total + +item.price;
        return currentTotal.toFixed(2)
    }, '')
}