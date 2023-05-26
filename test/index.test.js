const { calculator } = require('../src/index');

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
            totals:[{
                item: 'Total to pay',
                price: '0.50'
            }]}
        expect(calculator(basket).receipt).toEqual(receipt);
    })
    describe('offers', () => {
        test('should apply multi-buy savings', () => {
            const offers = [{ item: 'beans', basePrice: "0.50", discountName: "2 for 1", discountValue: "50", discountUnit: "%" }]
            const basket = [{ item: 'beans', price: '0.50' }]
            const basket2 = [{ item: 'beans', price: '0.50' }, { item: 'beans', price: '0.50' }]
            expect(calculator(basket, offers).total).toBe('0.50');
            expect(calculator(basket2, offers).total).toBe('0.50');
        })
    })
})