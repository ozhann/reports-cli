#!/usr/bin/env node

const program = require('commander');

const {
  averagePricePerSellerType,
  marketShare,
  avgPriceForTopListings,
  monthlyTopFive,
} = require('../index');

program.version('0.0.1');

// commands
program
  .command('prices')
  .description('--> Average Listing Selling Price per Seller Type')
  .action(() => averagePricePerSellerType());

program
  .command('marketshare')
  .description('--> Percentual Distribution of available cars by Make')
  .action(() => marketShare());

program
  .command('mostcontacted')
  .description('--> Average price of the 30% most contacted listings')
  .action(() => avgPriceForTopListings());

program
  .command('topfive <month>')
  .description('--> Monthly Top 5 most contacted listings from Janury to June')
  .action(month => monthlyTopFive(month));

program.parse(process.argv);
