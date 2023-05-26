const {calculator}= require('../src/index');

describe('calculator', () => {
    test('should add up simple supermaket items without offers or by weight pricing', () => {
        const basket = [{item: 'beans', price: '0.50'}]
        const basket2 = [{item: 'beans', price: '0.50'}, {item: 'beans', price: '0.50'}, {item: 'coke', price: '0.70'}]
        expect(calculator(basket)).toBe('0.50');
        expect(calculator(basket2)).toBe('1.70');
    })
})