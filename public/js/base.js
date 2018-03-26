// document.addEventListener('DOMContentLoaded', () => {
// });

console.log('Hello from the browser JavaScript');
// for development purposes, we want to use a prompt to obtain the subcription keyframes
// we'll use local storage for the users subscription key or store the information in the cookie

let images = [];

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
const modalItems = getElement('.modal-items');
const imageContainer = getElement('.image-container');
const closeButton = getElement('.modal-close-btn');

const openModal = () => {
  modalOverlay.classList.add('show-modal');
  modal.classList.add('show-modal');
  bodyElement.classList.add('disable-scroll');
};

const closeModal = () => {
  modalOverlay.classList.remove('show-modal');
  modal.classList.remove('show-modal');
  bodyElement.classList.remove('disable-scroll');
};

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
  // thumbnail image display properties
  const height = 60;
  const width = Math.round(height * (imageWidth / imageHeight));
  // these elements only appear after a fetch request or a modal has been opened
  const imageContainerChild = getElement('#image-container-child');

  // create image tile div as a container for the image
  const imageTile = createElement('div');
  imageTile.dataset.imageTile = index;
  imageTile.className += `image-tile-number-${index} img-tile-thumbnail cursor-pointer`;
  // add event listener to image tile which opens modal upon click
  eventCreator(imageTile, 'click', openModal);

  // create the image thumbnail and assign unique identifiers for easier retrieval
  const imageElement = createElement('img');
  imageElement.src = imageThumbnailUrl;
  imageElement.dataset.image = index;
  imageElement.className += `image-number-${index} img-thumbnail`;
  imageElement.height = height;
  imageElement.width = width;

  // append DOM elements created above
  imageContainerChild.appendChild(imageTile);
  imageTile.appendChild(imageElement);
  return imageTile;
};

// fetch request to retrieve images from search api
const getImages = (event) => {
  removeChild(imageContainer);
  const selectedCharacter = event.target.dataset.actress;
  // additional search terms to increase search relevance
  const additionalSearchTerms = ' black panther movie poster';
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
      images = response.value.map((image, index) =>
        renderImages(image.thumbnailUrl, image.thumbnail.width, image.thumbnail.height, index));
      console.log('array of image objects', images);
    });
  // .catch(console.log);
};

// assign event listener to the character buttons
getMultipleElements('.character-selectors').forEach((character) => {
  eventCreator(character, 'click', getImages);
});

// attaching event listener to close modal button
eventCreator(closeButton, 'click', closeModal);

// });
