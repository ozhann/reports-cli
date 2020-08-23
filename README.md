<!-- prettier-ignore-start -->


# Coding Challenge: AutoScout24 Listing Report

### Goal of this task

This reporting tool is made to analyze listings data to understand car market based on listing prices and attractiveness, also customer demand, and engagement with these listings.

Especially internal business development and marketing departments can benefit from it by adjusting Autoscout24 marketplace to make it more attractive place to connect sellers and buyers and increase traffic and engagement in a more effective manner.

### Requirements:

Write a console application that takes the supplied CSV lists and generates the following reports:

- Average Listing Selling Price per Seller Type
- Percentual Distribution of available cars by Make
- Average price of the 30% most contacted listings
- The Top 5 most contacted listings per Month

### Technical Info

This reporting tool written in Node.js environment.
It is a CLI tool and expects a command from user to choose and display requested report.

HOW TO RUN IT:

After cloning the project in your local machine, please make sure to install dependencies by using "npm install" command.

Application can be run by "listing-report" command after intallation is done.

IMPORTANT NOTE: It might require to install it globally on your machine in that case you can follow below command.
Or simply run it by "node ./bin/reports.js" command and it will give you the same result.

"sudo npm link" to install it on your machine globally.

### Application Guide

It can be run by "listing-report" command on console and it will give user following reporting options.

    Commands:
    prices           --> Average Listing Selling Price per Seller Type
    marketshare      --> Percentual Distribution of available cars by Make
    mostcontacted    --> Average price of the 30% most contacted listings
    topfive <month>  --> Monthly Top 5 most contacted listings from Janury to June

## Average Listing Selling Price per Seller Type

After displaying report options, you can simply type "listing-report prices" and it would output the following result.

┌─────────────┬─────────────────┐
│ Seller Type │ Average in Euro │
├─────────────┼─────────────────┤
│ Private     │ €26,080.48      │
├─────────────┼─────────────────┤
│ Dealer      │ €25,037.34      │
├─────────────┼─────────────────┤
│ Other       │ €25,317.76      │
└─────────────┴─────────────────┘
Ozhans-MacBook-Air:listing-report ozy$ 

## Percentual distribution of available cars by Make

Command "listing-report marketshare" would give below result.

───────────────┬──────────────┐
│ Make          │ Distribution │
├───────────────┼──────────────┤
│ Mercedes-Benz │ 16.3%        │
├───────────────┼──────────────┤
│ Toyota        │ 16.0%        │
├───────────────┼──────────────┤
│ Audi          │ 14.0%        │
├───────────────┼──────────────┤
│ Renault       │ 14.0%        │
├───────────────┼──────────────┤
│ Mazda         │ 13.3%        │
├───────────────┼──────────────┤
│ VW            │ 10.3%        │
├───────────────┼──────────────┤
│ Fiat          │ 9.0%         │
├───────────────┼──────────────┤
│ BWM           │ 7.0%         │
└───────────────┴──────────────┘


## Average price of the 30% most contacted listings

Command "listing-report mostcontacted" would give below result.

┌──────────────────────────┐
│ Average Price of Top 30% │
├──────────────────────────┤
│ €24,638.87               │
└──────────────────────────┘

| Average Price of Top 30% │
|--------------------------|
│ €24,638.87               |

## The Top 5 most contacted listings per Month

Command "listing-report topfive <month>" would give below result.

IMPORTANT: You must specify desired month to display report.

Example: "listing-report topfive January"

Month: January 2020
┌─────────┬──────┬───────────────┬────────────┬─────────┬─────────────┐
│ ranking │ id   │ make          │ price      │ mileage │ seller type │
├─────────┼──────┼───────────────┼────────────┼─────────┼─────────────┤
│ 1       │ 1061 │ Renault       │ €5,641.00  │ 7000 KM │ other       │
├─────────┼──────┼───────────────┼────────────┼─────────┼─────────────┤
│ 2       │ 1077 │ Mercedes-Benz │ €8,007.00  │ 4000 KM │ other       │
├─────────┼──────┼───────────────┼────────────┼─────────┼─────────────┤
│ 3       │ 1099 │ BWM           │ €5,914.00  │ 8500 KM │ dealer      │
├─────────┼──────┼───────────────┼────────────┼─────────┼─────────────┤
│ 4       │ 1122 │ Audi          │ €40,481.00 │ 2000 KM │ other       │
├─────────┼──────┼───────────────┼────────────┼─────────┼─────────────┤
│ 5       │ 1132 │ Mercedes-Benz │ €34,490.00 │ 7000 KM │ dealer      │
└─────────┴──────┴───────────────┴────────────┴─────────┴─────────────┘


Month: February 2020
┌─────────┬──────┬───────────────┬────────────┬─────────┬─────────────┐
│ ranking │ id   │ make          │ price      │ mileage │ seller type │
├─────────┼──────┼───────────────┼────────────┼─────────┼─────────────┤
│ 1       │ 1006 │ Renault       │ €47,446.00 │ 7500 KM │ other       │
├─────────┼──────┼───────────────┼────────────┼─────────┼─────────────┤
│ 2       │ 1138 │ Toyota        │ €13,986.00 │ 8000 KM │ other       │
├─────────┼──────┼───────────────┼────────────┼─────────┼─────────────┤
│ 3       │ 1235 │ Mercedes-Benz │ €5,847.00  │ 5500 KM │ dealer      │
├─────────┼──────┼───────────────┼────────────┼─────────┼─────────────┤
│ 4       │ 1250 │ Renault       │ €8,446.00  │ 5000 KM │ dealer      │
├─────────┼──────┼───────────────┼────────────┼─────────┼─────────────┤
│ 5       │ 1271 │ Mercedes-Benz │ €47,165.00 │ 6500 KM │ private     │
└─────────┴──────┴───────────────┴────────────┴─────────┴─────────────┘

### How to run the test

Test is written with Jest framework.
It can be run with "npm test" command.

##### Definition of the CSV files

- Listing.cvs

| field       | type         | required |
| ----------- | ------------ | -------- |
| id          | numeric      | yes      |
| make        | alphanumeric | yes      |
| price       | numeric      | yes      |
| mileage     | numeric      | yes      |
| seller_type | alphanumeric | yes      |

- contacts.cvs

| field        | type    | required |
| ------------ | ------- | -------- |
| listing_id   | numeric | yes      |
| contact_date | lis     | yes      |





<!-- prettier-ignore-end -->
