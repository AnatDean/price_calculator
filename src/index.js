const calculateDiscount = (offer, items) => {
    const { basePrice,offerMultiplier, offerCondition} = offer;
    const numberOfNonEligibleItems = items.length % offerCondition;
    const eligibleItemsN = items.length - numberOfNonEligibleItems;
    const discount = eligibleItemsN  * offerMultiplier * basePrice
    return discount
}

exports.calculator = (basket, offers = []) => {
    const basketTotal =  basket.reduce(({receipt, total}, item, i) => {
        const isLastItem = i === basket.length -1
        const currentTotal = +total + +item.price;
        const totalAsPrice = currentTotal.toFixed(2);

        const currentReceipt = {...receipt, items: [...receipt.items, item]};

        return {receipt: currentReceipt, total:totalAsPrice};
    }, {receipt:{items:[], savings: [], totals:[]}, total:''})

    // subTotal 
    const subTotalItem = {item: 'Sub-total', price: basketTotal.total}
    basketTotal.receipt.totals.push(subTotalItem)

    offers.forEach(offer => {
       const { item, basePrice,offerName,offerValue, offerType,offerUnit, offerCondition, } = offer;
       const basketHasOfferItem = !!basketTotal.receipt.items.find(product => product.item ===item)
       if (basketHasOfferItem) {

        // check eligibility of items for offer
        const eligibleItems = basketTotal.receipt.items.filter(basketItem => basketItem.item === item );
        const conditionMet = eligibleItems.length >= offerCondition;
        const discount = calculateDiscount(offer, eligibleItems);
        // apply offer & ammend receipt
        if (discount > 0) {
            basketTotal.total = (+basketTotal.total - discount).toFixed(2)
            basketTotal.receipt.savings.push({item: offerName, price: discount.toFixed(2)})
        }
       };
    });

    if (offers.length) basketTotal.receipt.totals.push({item:'Total Savings', price: (+subTotalItem.price - +basketTotal.total).toFixed(2) })
    basketTotal.receipt.totals.push({item:'Total to pay', price:basketTotal.total })
    console.log(JSON.stringify(basketTotal, null, 2))
    return basketTotal
}