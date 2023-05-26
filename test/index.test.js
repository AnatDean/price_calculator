const { calculator } = require('../src/calculator');

describe('calculator', () => {
    test('should add up simple supermaket items without offers or by weight pricing', () => {
        const basket = [{ item: 'beans', price: '0.50' }]
        const basket2 = [{ item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }, { item: 'coke', price: '0.70' }]
        expect(calculator(basket).total).toBe('0.50');
        expect(calculator(basket2).total).toBe('1.70');
    })
    test('should list totaled items from basket', () => {
        const basket = [{ item: 'beans', price: '0.50' }]
        const receipt = {
            items:[{
                item: 'beans',
                price: '0.50'
            }],
            savings:[],
            totals:[
                {
                    item: 'Sub-total',
                    price: '0.50'
                },
                {
                item: 'Total to pay',
                price: '0.50'
            }]}
        expect(calculator(basket).receipt).toEqual(receipt);
    })
    describe('offers', () => {
        test('should apply multi-buy savings', () => {
            const offers = [{ item: 'beans', basePrice: "0.50", offerName: "2 for 1", offerType:'unit',offerMultiplier: 0.5,offerCondition:2 }]
            const basket = [{ item: 'beans', price: '0.50' }]
            const basket2 = [{ item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }]
            const basket3 = [{ item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }]
            expect(calculator(basket, offers).total).toBe('0.50');
            expect(calculator(basket2, offers).total).toBe('0.50');
            expect(calculator(basket3, offers).total).toBe('1.00');
        })
        test('should add multi-buy savings to receipt', () => {
            const offers = [{ item: 'beans', basePrice: "0.50", offerName: "2 for 1", offerType:'unit',offerMultiplier: 0.5,offerCondition:2 }]
            const basket = [{ item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }]
            const receipt =  {
                items:[{
                    item: 'beans',
                    price: '0.50'
                },
                {
                    item: 'beans',
                    price: '0.50'
                },
                {
                    item: 'beans',
                    price: '0.50'
                }],
                savings: [{
                    item:'2 for 1',
                    price: "0.50"
                }],
                totals:[
                    {item: 'Sub-total', price: "1.50"},
                    {item: 'Total to pay',price: '1.00'}]
            }
            expect(calculator(basket, offers).receipt.items).toEqual(receipt.items);
            expect(calculator(basket, offers).receipt.savings).toEqual(receipt.savings);
        })
        test('should list subtotals and totals', () => {
            const offers = [{ item: 'beans', basePrice: "0.50", offerName: "2 for 1", offerType:'unit',offerMultiplier: 0.5,offerCondition:2 }]
            const basket = [{ item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }]
            const receipt =  {
                items:[{
                    item: 'beans',
                    price: '0.50'
                },
                {
                    item: 'beans',
                    price: '0.50'
                },
                {
                    item: 'beans',
                    price: '0.50'
                }],
                savings: [{
                    item:'2 for 1',
                    price: "0.50"
                }],
                totals:[{
                    item: 'Sub-total',
                    price: '1.50'
                },
                {
                    item: 'Total Savings',
                    price: '0.50'
                },
                {
                    item: 'Total to pay',
                    price: '1.00'
                },
            ]
            }
            expect(calculator(basket, offers).receipt).toEqual(receipt);
        })
    })
    test('should calculate price by weight', () => {
        const basket = [{ item: 'beans', price: '1.99', weight: '0.5kg', priceModifier: 'kg' }]
        const basket2 = [{ item: 'beans', price: '1.99', weight: '1kg', priceModifier: 'kg'}]
        const basket3 = [{ item: 'beans', price: '1.99', weight: '1.2kg' , priceModifier: 'kg'}]
        expect(calculator(basket).total).toBe('1.00'); // round 0.995 up.
        expect(calculator(basket2).total).toBe('1.99');
        expect(calculator(basket3).total).toBe('2.39'); // round 2.388 up.
    })
    test('should reflect price by weight in receipt', () => {
        const basket = [
            { item: 'beans', price: '0.50' },
            { item: 'bananas', price: '1.99', weight: '0.6kg', priceModifier: 'kg' }]
        const receipt =  {
            items:[{
                item: 'beans',
                price: '0.50'
            },
            {
                item:'bananas',
                price: '1.19',
                modifier: '0.6kg @ 1.99/kg'
            }
         ],
            savings: [],
            totals:[{
                item: 'Sub-total',
                price: '1.69'
            },
            
            {
                item: 'Total to pay',
                price: '1.69'
            },
        ]
        }
        expect(calculator(basket).receipt).toEqual(receipt)
    })
   
})