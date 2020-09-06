const CSVToJSON = require('csvtojson');

async function fetchListingsData() {
  const listings = await CSVToJSON().fromFile('./data/listings.csv');

  return listings;
}

async function fetchContactsData() {
  const contacts = await CSVToJSON().fromFile('./data/contacts.csv');

  return contacts;
}

module.exports = { fetchListingsData, fetchContactsData };
