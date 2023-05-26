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

        if (isLastItem) currentReceipt.totals.push({item: "Total to pay", price: totalAsPrice})

        return {receipt: currentReceipt, total:totalAsPrice};
    }, {receipt:{items:[], savings: [], totals:[]}, total:''})


    offers.forEach(offer => {
       const { item, basePrice,offerName,offerValue, offerType,offerUnit, offerCondition, } = offer;
       const basketHasOfferItem = !!basketTotal.receipt.items.find(product => product.item ===item)
       if (basketHasOfferItem) {

        // check eligibility of items for offer
        const eligibleItems = basketTotal.receipt.items.filter(basketItem => basketItem.item === item );
        const conditionMet = eligibleItems.length >= offerCondition;
        // apply offer
        const discount = calculateDiscount(offer, eligibleItems);
        if (discount > 0) basketTotal.total = (+basketTotal.total - discount).toFixed(2)
       };

    })
    return basketTotal
}