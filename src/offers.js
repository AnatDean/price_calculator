const differenceBy = require('lodash.differenceby');


const handleFixedPriceOffers = ({offer, items, isSetOffer, eligibleItemsN}) => {

    /*

        Get items from basket that are eligible for fixed price offer
        Discard any that can't be grouped into offer conditions (e.g. only buying in 3s)
        Total original price
        Calculate discount from diff between offer price.

    */
   
    const eligibleItems = ! isSetOffer ? 
    items.filter(({item: basketItem})=> offer.item === basketItem) : 
    items.filter(({item: basketItem}) => offer.set.find(({item: offerItem})=> basketItem === offerItem));
    
    const eligibleItemsThatCanBeDiscounted = eligibleItems.slice(0, eligibleItemsN)
    const totalNonDiscounted = eligibleItemsThatCanBeDiscounted.reduce((total, item) => total + +item.price, 0)
    console.log({eligibleItems, eligibleItemsThatCanBeDiscounted, totalNonDiscounted})
    
    const discountValue =  totalNonDiscounted - +offer.offerPrice

    return discountValue
}

const calculateDiscount = (offer, items) => {
    const { basePrice,offerMultiplier, offerCondition, offerType} = offer;


    const isFixedPriceOffer = offerType === 'fixed'
    const isSetOffer = !!offer.set
    const itemsNotInSet = isSetOffer && differenceBy(items, offer.set, 'item');

    const numberOfNonEligibleItems = (items.length % offerCondition) + (isSetOffer && itemsNotInSet.length); 

    const eligibleItemsN = items.length - numberOfNonEligibleItems ; 
    if (!eligibleItemsN) return 0

    if (isFixedPriceOffer) {
      return handleFixedPriceOffers({offer, items, isSetOffer, eligibleItemsN})
    }

    const discount =  offerMultiplier * basePrice;
    return isFixedPriceOffer ? discount : discount * eligibleItemsN
}

exports.calculateSavings = (offers, basketTotal) => {
    return offers.reduce((offerAcc, offer) => {
    const { item, offerName } = offer;

    const basketHasOfferItem = !!basketTotal.receipt.items.find(product => product.item ===item);
    if (!basketHasOfferItem) return offerAcc;
    if (basketHasOfferItem) {

     const discount = calculateDiscount(offer, basketTotal.receipt.items);

     if (discount > 0) {
         const savingItem = {item: offerName, price: discount.toFixed(2)}
         return {savings: [...offerAcc.savings, savingItem], totalSavings: offerAcc.totalSavings + discount}
     };

     return offerAcc
    };
 }, {savings: [], totalSavings: 0 })
}