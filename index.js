const CSVToJSON = require('csvtojson');
const _ = require('underscore');
const Table = require('cli-table3');

const { fetchListingsData, fetchContactsData } = require('./data');

// format price in euro currency
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

// Average Listing Selling Price per Seller Type
async function averagePricePerSellerType() {
  // get listing data as JSON file
  const listings = await CSVToJSON().fromFile('./data/listings.csv');
  // const listings = await fetchListingsData();
  // listers sellers by their type
  const privateSellers = listings.filter(
    listing => listing.seller_type === 'private'
  );
  const otherSellers = listings.filter(
    listing => listing.seller_type === 'other'
  );
  const dealerSellers = listings.filter(
    listing => listing.seller_type === 'dealer'
  );

  // calculates average price for each seller type
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

  // groups and counts listings by make/producer
  const listingNumbersByBrand = listings
    .map(listing => listing.make)
    .reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  // sort the list from highest and makes them percentual
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

  // count contacted listings
  const mostContacted = contacts
    .map(contact => contact.listing_id)
    .reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  // sort listing.id from highest contacted count and filter top 30%
  const topListings = Object.entries(mostContacted)
    .sort((a, b) => b[1] - a[1])
    .map(el => el[0])
    .filter((el, i) => i < (30 * listings.length) / 100);

  // match prices from listing file and calculate average price
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

  // convert time format
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

  // get monthly most contacted listings from user input
  const mostContacted = groupedByMonth[month]
    .map(listing => listing.listing_id)
    .reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  // console.log(mostContacted);
  // sort highest and filter top five
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

// Makes Top Night Contact Report

// Estimated Time: 10-15 Minutes

// Extend your current console application with the "Makes Report". The report should contain the following set of information:

// Which Make(s) had the biggest number of contacts during night (6pm to 2am UTC)
// Example: Make(s): BWM (786 contacts)

async function contactsAtNight() {
  const contacts = await CSVToJSON().fromFile('./data/contacts.csv');
  const listings = await CSVToJSON().fromFile('./data/listings.csv');

  const timeConvert = contacts.map(contact => ({
    listing_id: contact.listing_id,
    contact_date: new Date(+contact.contact_date).getUTCHours(),
  }));

  const mostContactedByHour = timeConvert
    .filter(time => time.contact_date >= 18 || time.contact_date <= 2)
    .map(listing => listing.listing_id)
    .reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  // console.log(mostContactedByHour);

  const add = listings.map(listing => {
    listing.count = mostContactedByHour[listing.id];
    return listing;
  });
  // console.log(add);

  const contactByBrand = add.reduce((acc, val) => {
    acc[val.make] = val.count;
    return acc;
  }, {});

  console.log(contactByBrand);
}

contactsAtNight();

// Makes Top Prices Report

// Estimated Time: 5-10 Minutes

// Which Make(s) have average price higher than the overall average(comma separated list)
// Example: Make(s): Audi, BWM, VW

function higherAverage() {
  console.log('brands higher than average prices ');
}

higherAverage();

module.exports = {
  averagePricePerSellerType,
  marketShare,
  avgPriceForTopListings,
  monthlyTopFive,
};
