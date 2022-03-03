# Update

Unfortuntaely I have had to take down the serverless hosting on Firebase for this project.  Due to not having time to develop this, and not being able to impose limits, some of the API's are constantly being called every few seconds.
This has caused my budget to be hit within a matter of days, sometimes costing around £30 a day which is not sustainable.

The below can still be deployed to your own Firebase instance or modified to run locally.


# Usage

All requests are `GET` requests to `/api/[country]/[council]`.  Please see specific codebases for exact requests

For most requests, use your UPRN which can be found here: https://uprn.uk/

> Note: The root domain below will eventually change when a domain has been configured

### Cheshire East
GET `/api/uk/cheshire_east?uprn=XXXXXXX`

### Stockport
GET `/api/uk/stockport?uprn=XXXXXXX`

### East Cambridgeshire
GET `/api/uk/east_cambridgeshire?uprn=XXXXXXX`

### Wakefield 
__Uses scraping technology therefore response may take longer than expected__

GET `/api/uk/wakefield?uprn=XXXXXXX`

### Wiltshire

GET `/api/uk/wiltshire?uprn=XXXXXXX&postcode=XXXXXX`


# Contribution

## Getting Started

First, install dependencies with `npm i` and then run the development server:

```bash
npm run dev
# or
yarn dev
```

- Create a file under `/functions/helpers` for your chosen council to perform the page parsing logic
- Add the parser to the exports under `/functions/index.js`
- Add the API route rewrite to the `firebase.json` file, under the hosting.rewrites array
