# Price Calculator

## Pre-requisites
- Node
- Npm

## How to get started

- Download this repository (`git clone <url>`)
- Install dependencies (`npm install`)
- Run tests (`npm t`)
- See an example calculation and receipt (`npm start`)


## Process

- TDD was used throughout to get the basic functionality of the calculations working, with a focus on one pricing structure and one offer structure initially. Then complexity was build in by testing and implementing more pricing structures (by weight, fixed prices and items within a set offers)

- I used differenceBy from the lodash utility library while calculating discount amounts for both time constraints and convenience sake.


## Approach

To consider the possibility of changing requirements I separate the concerns of calculating prices, applying discounts and visuals for the reciept. 

Products (items) are given a simple schema that includes a name and price, while price offers are given a more complex schema to handle the various types of offers and to account for the name applied on the reciept. 

Tradeoffs: at the moment, with limited time to focus on the task, there is inefficiency introduced through repeated iterations. Though the lists are short in the test suite this inefficiency will accumulate as the list of offers or size of basket sizes increase. These iterations are a tradeoff for the minimal project, without stores or databases to cache and retrieve data: instead manually creating and passing around lists of products and offers.

Language limitations: node is not well known for its number savvyness - with more planning in place I could have better managed the necessary conversion to and from numbers / strings to support the currency two point decimals required throughout.

Achievements: I am proud of the particular challenge and solution I took to the application of offers/discounts when considering a numerical condition (e.g minimum 3 products) and accounting for that condition being met multiple times or only partially (e.g. 7 coffees for a deal that applies to 3 coffees at a time must discount 6). 
