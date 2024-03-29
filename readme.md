# F1 Seasons and Winners

A React application that renders Formula 1 (F1) Seasons from 2005 to current year and shows the list of season champions and winners for each round per season.

Built with Vitejs, React, react-router, and SWR. Styling is done with scss.

The application gets the data from this [API](http://ergast.com/mrd) `http://ergast.com/api`

## Demo

Visit https://formula1-app.netlify.app/

## Screenshots

![screenshot](./screenshots/f11.png)
![screenshot1](./screenshots/f12.png)

## Run locally

- Clone the Repository
- (Optional) add .env file and add the values in sample.env. It's optional because all current used .env values have the same default in this application.
- `npm ci`
- `npm run dev`
- App should open in `http://localhost:3000`

To run the tests, `npm run test`

### Decisions 

#### Vite

This is now the recommended approach for react single page applications. It provides very fast server start and HMR. It also features a lot of plugins and fully typed APIs.

#### React router

This is a small app, however, adding the react-router to application is beneficial for url and browser history.

#### SWR

[SWR](https://swr.vercel.app/) is an awesome library for data fetching which handles caching and revalidation out of the box. It also has support for handling paginated requests which in this scenario is required for the API. 

For this app, the SWR cache is persisted to localstorage and revalidation is disabled. The reason for this is to provide a faster experience and reduce the calls to the free API since this data is not updated every day.

### Improvement List for a production ready app
- Improved parallel fetching for paginated requests (for faster requests when opening a season page)
- Replace the svg and icons library dependencies with local svg icons to improve performance
- SEO and accessibility improvements
- integration testing


-----
##### Car Logo (in header) attribute 
###### Formula 1 by Muhammad Atiq from <a href="https://thenounproject.com/browse/icons/term/formula-1/" target="_blank" title="Formula 1 Icons">Noun Project</a>
