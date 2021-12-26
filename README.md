## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Usage

All requests are `GET` requests to `/api/[country]/[council]`.  Please see specific codebases for exact requests

For most requests, use your UPRN which can be found here: https://uprn.uk/


### Cheshire East
GET `https://bin-collection-api.web.app/api/uk/cheshire_east?uprn=XXXXXXX`

### Stockport
GET `https://bin-collection-api.web.app/api/uk/stockport?uprn=XXXXXXX`

### East Cambridgeshire
GET `https://bin-collection-api.web.app/api/uk/east_cambridgeshire?uprn=XXXXXXX`

### Wakefield 
__Uses scraping technology therefore response may take longer than expected__

GET `https://bin-collection-api.web.app/api/uk/wakefield?uprn=XXXXXXX`


## Contribution
- Create a file under `/functions/helpers` for your chosen council to perform the page parsing logic
- Add the parser to the exports under `/functions/index.js`
- Add the API route rewrite to the `firebase.json` file, under the hosting.rewrites array
