const CSVToJSON = require('csvtojson');

const dataFetch = (async () => {
  try {
    const data = await CSVToJSON().fromFile('./data/listings.csv');

    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();

module.exports = {
  dataFetch,
};
