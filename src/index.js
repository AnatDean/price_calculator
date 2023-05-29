const {calculator} = require('./calculator')

const sampleBasket = [{ item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }, { item: 'bananas', price: '1.99', weight: '0.5kg', priceModifier: 'kg' }, { item: 'coke', price: '1.50' },{ item: 'coke', price: '1.50' }]

const sampleOffers = [{ item: 'beans', basePrice: "0.50", offerName: "2 for 1", offerType:'unit',offerMultiplier: 0.5,offerCondition:2 }, { item: 'coke', basePrice: "1.50", offerName: "2 for £2", offerType:'fixed',offerMultiplier: (2/3),offerCondition:2 }]

const calculatedBasket = calculator(sampleBasket, sampleOffers)


Object.entries(calculatedBasket.receipt).forEach(([label, table]) => {
    console.log(label)
    console.log(`----`)

    table.forEach(({price, item, modifier}) => {
        if (!modifier) {
            console.log(`${item} | ${price}`)
        }
        else {
            console.log(item);
            console.log(`${modifier} | ${price}`)
        }
    })
    console.log(`----`)
});


