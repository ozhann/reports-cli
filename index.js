const CSVToJSON = require('csvtojson');
const _ = require('underscore');
const Table = require('cli-table3');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

// Average Listing Selling Price per Seller Type
async function averagePricePerSellerType() {
  const listings = await CSVToJSON().fromFile('./data/listings.csv');

  const privateSellers = listings.filter(
    listing => listing.seller_type === 'private'
  );
  const otherSellers = listings.filter(
    listing => listing.seller_type === 'other'
  );
  const dealerSellers = listings.filter(
    listing => listing.seller_type === 'dealer'
  );

  const avgPrivatePrice =
    privateSellers.reduce((acc, cur) => acc + +cur.price, 0) /
    privateSellers.length;

  const avgDealerPrice =
    dealerSellers.reduce((acc, cur) => acc + +cur.price, 0) /
    dealerSellers.length;

  const avgOtherPrice =
    otherSellers.reduce((acc, cur) => acc + +cur.price, 0) /
    otherSellers.length;

  const table = new Table({ head: ['Seller Type', 'Average in Euro'] });
  table.push(
    ['Private', formatter.format(avgPrivatePrice)],
    ['Dealer', formatter.format(avgDealerPrice)],
    ['Other', formatter.format(avgOtherPrice)]
  );

  console.log(table.toString());
}

// Percentual Distribution of available cars by Make
async function marketShare() {
  const listings = await CSVToJSON().fromFile('./data/listings.csv');

  const listingNumbersByBrand = listings
    .map(listing => listing.make)
    .reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  const sortAndUpdate = Object.entries(listingNumbersByBrand)
    .sort((a, b) => b[1] - a[1])
    .map(car => {
      car[1] = ((car[1] / listings.length) * 100).toFixed(1) + '%';
      return car;
    });

  const table = new Table({ head: ['Make', 'Distribution'] });
  table.push(...sortAndUpdate);

  console.log(table.toString());
}

// Average price of the 30% most contacted listings
async function avgPriceForTopListings() {
  const listings = await CSVToJSON().fromFile('./data/listings.csv');
  const contacts = await CSVToJSON().fromFile('./data/contacts.csv');

  const mostContacted = contacts
    .map(listing => listing.listing_id)
    .reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  const topListings = Object.entries(mostContacted)
    .sort((a, b) => b[1] - a[1])
    .map(el => el[0])
    .filter((el, i) => i < (30 * listings.length) / 100);

  const avgPrice =
    listings
      .filter(listing => topListings.includes(listing.id))
      .reduce((acc, cur) => acc + +cur.price, 0) / topListings.length;

  const table = new Table({ head: ['Average Price of Top 30%'] });
  table.push([formatter.format(avgPrice)]);

  console.log(table.toString());
}

// The Top 5 most contacted listings per Month
async function monthlyTopFive(month) {
  const listings = await CSVToJSON().fromFile('./data/listings.csv');
  const contacts = await CSVToJSON().fromFile('./data/contacts.csv');

  // convert time
  const timeConvert = contacts.map(contact => ({
    listing_id: contact.listing_id,
    contact_date: new Date(+contact.contact_date).toLocaleString('de-DE', {
      month: 'long',
    }),
  }));
  // group listings by month
  const groupedByMonth = _.groupBy(timeConvert, function (item) {
    return item.contact_date;
  });

  const mostContacted = groupedByMonth[month]
    .map(listing => listing.listing_id)
    .reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  const topFiveContacted = Object.entries(mostContacted)
    .sort((a, b) => b[1] - a[1])
    .map(el => el[0])
    .filter((el, i) => i < 5);

  const topFiveDetails = listings.filter(listing =>
    topFiveContacted.includes(listing.id)
  );

  const table = new Table({
    head: ['ranking', 'id', 'make', 'price', 'mileage', 'seller type'],
  });

  const tableFormat = topFiveDetails
    .map(obj => {
      obj.price = formatter.format(obj.price);
      obj.mileage = obj.mileage + ' KM';
      return obj;
    })
    .map(obj => Object.values(obj));
  table.push(
    ['1', ...tableFormat[0]],
    ['2', ...tableFormat[1]],
    ['3', ...tableFormat[2]],
    ['4', ...tableFormat[3]],
    ['5', ...tableFormat[4]]
  );
  console.log(`Month: ${month} 2020`);
  console.log(table.toString());
}

module.exports = {
  averagePricePerSellerType,
  marketShare,
  avgPriceForTopListings,
  monthlyTopFive,
};
