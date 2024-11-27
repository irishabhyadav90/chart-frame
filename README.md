# Chart Frame using React + TypeScript

Key functionalities of the project:

ChartFrame Project where you can create charts with Fred API's, Additionally you can edit, delete and customize charts with features like
Frequencies, colors, chartFrame supports both Bar and Line graphs


## Project requirements

```js
Node.js (version >= 20.x)
npm
```

- Steps

```js

git clone https://github.com/irishabhyadav90/chart-frame.git
cd chart-frame
npm install

```

## Add environment variables:

- Create a .env.local file in the root directory.
- Add the required variables

```js

VITE_FRED_BASE_URL=https://api.stlouisfed.org/fred
VITE_FRED_API_KEY=your_api_key_here

```


## Start the development server:

```js

npm run dev

```

## Testing

- Testing is implemented using Playwright for end-to-end testing.

```js

npx playwright test

```