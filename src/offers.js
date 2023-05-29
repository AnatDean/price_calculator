const calculateDiscount = (offer, items) => {
    const { basePrice,offerMultiplier, offerCondition, offerType} = offer;
    const isFixedPriceOffer = offerType === 'fixed'

    // presuming offer conditions are based on minimum units of product, and multiple applications of offer.
    const numberOfNonEligibleItems = items.length % offerCondition; 
    const eligibleItemsN = items.length - numberOfNonEligibleItems; 


    const discount =  offerMultiplier * basePrice;
    return isFixedPriceOffer ? discount : discount * eligibleItemsN
}

const getOfferElligibleItems = (items, offerItem) => items.filter(({item}) => item === offerItem );

exports.calculateSavings = (offers, basketTotal) => {
    return offers.reduce((offerAcc, offer) => {
    const { item, offerName } = offer;

    const basketHasOfferItem = !!basketTotal.receipt.items.find(product => product.item ===item);
    if (!basketHasOfferItem) return offerAcc;
    if (basketHasOfferItem) {

     // check eligibility of items for offer
     const eligibleItems = getOfferElligibleItems(basketTotal.receipt.items, item);

     const discount = calculateDiscount(offer, eligibleItems);

     if (discount > 0) {
         const savingItem = {item: offerName, price: discount.toFixed(2)}
         return {savings: [...offerAcc.savings, savingItem], totalSavings: offerAcc.totalSavings + discount}
     };

     return offerAcc
    };
 }, {savings: [], totalSavings: 0 })
}