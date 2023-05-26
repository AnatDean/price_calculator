const {calculator} = require('./calculator')

const sampleBasket = [{ item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }]

const sampleOffers = [{ item: 'beans', basePrice: "0.50", offerName: "2 for 1", offerType:'unit',offerMultiplier: 0.5,offerCondition:2 }]

const calculatedBasket = calculator(sampleBasket, sampleOffers)


Object.entries(calculatedBasket.receipt).forEach(([label, table]) => {
    console.log(label)
    console.log(`----`)

    table.forEach(({price, item}) => {
        console.log(`${item} | ${price}`)
        
    })
    console.log(`----`)
});


