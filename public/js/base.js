// document.addEventListener('DOMContentLoaded', () => {
// });

console.log('Hello from the browser JavaScript');
// for development purposes, we want to use a prompt to obtain the subcription keyframes
// we'll use local storage for the users subscription key or store the information in the cookie

// additional search terms to increase search relevance
const additionalSearchTerms = ' black panther movie poster';
const selectedCharacter = '';

// helper functions to get DOM elements
const createElement = elementType => document.createElement(elementType);
const getElement = className => document.querySelector(className);
const getMultipleElements = className => document.querySelectorAll(className);

// add an event listener to an element
const eventCreator = (button, eventType, func) => {
  if (button) {
    button.addEventListener(eventType, (event) => {
      func(event);
    });
  }
};

// get DOM elements using helper functions
const modal = getElement('.modal-container');
const modalOverlay = getElement('.modal-overlay');
const bodyElement = getElement('body');
const modalIems = getElement('.modal-items');

// handle error from fetch request
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

// fetch request to retrieve images from search api
const getImages = () => {
  const searchTerm = encodeURIComponent(`${selectedCharacter}${additionalSearchTerms}`);
  const host = 'https://api.cognitive.microsoft.com';
  const path = '/bing/v7.0/images/search?q=';
  const subscriptionKey = 'aa81bfbc07984ac5b3aac2130e041cb6';
  const url = `${host}${path}${searchTerm}`;

  const fetchOptions = {
    method: 'GET',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      Accept: 'application/json',
    },
  };

  fetch(url, fetchOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch(console.log);
};

// assign event listener to the character buttons
getMultipleElements('.character-selectors').forEach((character) => {
  character.addEventListener('click', (event) => {
    event.preventDefault();
    getImages();
  });
});
// });
