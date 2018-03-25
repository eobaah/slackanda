// document.addEventListener('DOMContentLoaded', () => {
// });

console.log('Hello from the browser JavaScript');
// for development purposes, we want to use a prompt to obtain the subcription keyframes
// we'll use local storage for the users subscription key or store the information in the cookie

// additional search terms to increase search relevance
const additionalSearchTerms = ' black panther movie';
let selectedCharacter = '';

// helper functions to get DOM elements
const createElement = elementType => document.createElement(elementType);
const getElement = className => document.querySelector(className);
const getMultipleElements = className => document.querySelectorAll(className);
// const futureImageContainerChild = (className) => {
//   if (document.querySelector(className)) {
//     return document.querySelector(className);
//   }
//   return '';
// };

// add an event listener to an element
const eventCreator = (button, eventType, func) => {
  if (button) {
    button.addEventListener(eventType, (event) => {
      func(event);
    });
  }
};

// remove child elements based on the parent
const removeChild = (parentElement) => {
  while (parentElement.children[0] !== undefined) {
    parentElement.removeChild(parentElement.children[0]);
  }
};

// get DOM elements using helper functions
const modal = getElement('.modal-container');
const modalOverlay = getElement('.modal-overlay');
const bodyElement = getElement('body');
const modalIems = getElement('.modal-items');
const imageContainer = getElement('.image-container');

// handle error from fetch request
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const renderImages = (imageThumbnailUrl, imageWidth, imageHeight, index) => {
  const height = 60;
  const width = Math.round(height * (imageWidth / imageHeight));
  // these elements only appear after a fetch request or a modal has been opened
  const imageContainerChild = getElement('#image-container-child');
  // create DOM elements
  const imageTile = createElement('div');
  const imageElement = createElement('img');
  imageTile.dataset.imageTile = index;
  imageElement.src = imageThumbnailUrl;
  imageElement.dataset.image = index;
  imageElement.className += `image-${index} img-thumbnail`;
  imageElement.height = height;
  imageElement.width = width;

  // append DOM elements created above
  imageContainerChild.appendChild(imageTile);
  imageTile.appendChild(imageElement);

  // add event listener to Image Tile allowing user to open a modal
};

// fetch request to retrieve images from search api
const getImages = (event) => {
  removeChild(imageContainer);
  selectedCharacter = event.target.dataset.actress;
  const searchTerm = encodeURIComponent(`${selectedCharacter}${additionalSearchTerms}`);
  const host = 'https://api.cognitive.microsoft.com';
  const path = '/bing/v7.0/images/search?q=';
  const sizeFilter = '&size=wallpaper';
  const subscriptionKey = 'aa81bfbc07984ac5b3aac2130e041cb6';
  const url = `${host}${path}${searchTerm}${sizeFilter}`;

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
      // create a child element which will be the main parent for all images created below
      const createImageContainerChild = createElement('div');
      createImageContainerChild.setAttribute('id', 'image-container-child');
      // append this child to the main image container. Creating a single entrypoint
      // allows us to remove the images without looping through all the child elements
      imageContainer.appendChild(createImageContainerChild);
      const images = response.value.map((image, index) =>
        renderImages(image.thumbnailUrl, image.thumbnail.width, image.thumbnail.height, index));
      return images;
    })
    .catch(console.log);
};

// assign event listener to the character buttons
getMultipleElements('.character-selectors').forEach((character) => {
  eventCreator(character, 'click', getImages);
});

// });
