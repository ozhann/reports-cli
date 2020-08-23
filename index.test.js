const {
  averagePricePerSellerType,
  marketShare,
  avgPriceForTopListings,
  monthlyTopFive,
} = require('./index');

test('averagePricePerSellerType function exist', () => {
  expect(averagePricePerSellerType).toBeDefined();
});

test('marketShare function exist', () => {
  expect(marketShare).toBeDefined();
});

test('avgPriceForTopListings function exist', () => {
  expect(avgPriceForTopListings).toBeDefined();
});

test('monthlyTopFive function exist', () => {
  expect(monthlyTopFive).toBeDefined();
});
