This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Usage

All requests are `GET` requests to `/api/council/[council]`.  Please see specific codebases for exact requests

For most requests, use your UPRN which can be found here: https://uprn.uk/


### Cheshire East
GET `/api/council/cheshire_east?uprn=XXXXXXX`

### Stockport
GET `/api/council/stockport?uprn=XXXXXXX`

### East Cambridgeshire
GET `/api/council/east_cambridgeshire?uprn=XXXXXXX`



## Contribution
- Create a file under `src/helpers` for your chosen council to perform the page parsing logic
- Add the parse to the imports under `src/helpers/index.js` and export it
- Import the helper to `src/pages/api/council/[council].js` and add logic to the switch statement