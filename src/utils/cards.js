import fetch from 'isomorphic-fetch';
import { MTG_API_ENDPOINT } from '../constants';

const cacheImgURL = url =>
    new Promise(res => {
        const img = new Image();
        img.onload = res;
        img.src = url;
    });

export const cacheCardImages = cards =>
    Promise.all(cards.map(({ imageUrl }) => cacheImgURL(imageUrl)))
        .then(() => cards);

const fetchCards = (type, page, pageSize) =>
    fetch(
        `${MTG_API_ENDPOINT}?type=${type}&page=${page}&pageSize=${pageSize}`
    ).then(res => res.json());

export const asyncCardGenerator = async function*(pageSize = 20) {
    let currPage = 1;
    let result;

    while (true) {
        result = await fetchCards('Creature', currPage++, pageSize);

        if (result.cards.length === 0) {
            break;
        }

        yield result.cards;
    }
};

export const getCards = async iterable => {
    const item = await iterable.next();
    return item.value;
};

export const sortFactory = (sortAttr = 'none') => cards => 
    sortAttr === 'none'
        ? cards
        : [...cards].sort((a, b) => {
              const aVal = a[sortAttr].toUpperCase();
              const bVal = b[sortAttr].toUpperCase();

              return aVal < bVal
                  ? -1
                  : aVal > bVal
                      ? 1
                      : 0;
          });

export const filterFactory = text => cards =>
    text.length < 3
        ? cards
        : cards.filter(card => [
              card.name,
              card.artist,
              card.setName,
              card.originalType
          ].join('|').toUpperCase().includes(text.toUpperCase()));
