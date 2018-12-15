# Magic the Gathering API

## Getting Started
After cloning repo locally, run
```
npm install
```

followed by

```
npm start
```

The latter should boot up at http://localhost:3000.

## Behind the Scenes
Initially the site will make two calls to the API. The first is the initial 20 cards fetched. The second are the next 20 cards queued to display after that. After each of these and every subsequent batch fetch, all image URLs are cached so that as soon as React is ready to render them, they'll be visible almost instantaneously.

When the user scrolls to the bottom of the page, the queued cards are appended to the existing cards and the next batch is fetched and queued. Rinse, repeat, etc.

There is an filter input and a set of radio buttons for the different sort options. Each will only work on the displayed cards. `None` reverts displayed cards as originally returned by API.

## TODOs
- [ ] Prettier CSS. Nav needs some work and there certainly could be some centering and drop shadows for the cards.
- [ ] Extension options such as different card type filters, total card count, and related cards
- [ ] Better scroll handling. The current logic for the infinite scroll can be a little wonky if the user scrolls too fast to the bottom.