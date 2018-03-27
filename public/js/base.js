// document.addEventListener('DOMContentLoaded', () => {
// });

console.log('Hello from the browser JavaScript');
// for development purposes, we want to use a prompt to obtain the subcription keyframes
// we'll use local storage for the user's subscription key or store the information in the cookie

let images = [];

// helper functions to get DOM elements
const createElement = elementType => document.createElement(elementType);
const getElement = className => document.querySelector(className);
const getMultipleElements = className => document.querySelectorAll(className);

// helper function to add an event listener to an element
const eventCreator = (button, eventType, func) => {
  if (button) {
    button.addEventListener(eventType, event => {
      func(event);
    });
  }
};

// helper function to remove child elements based on the parent
const removeChild = parentElement => {
  while (parentElement.children[0] !== undefined) {
    parentElement.removeChild(parentElement.children[0]);
  }
};

// get DOM elements using helper functions
const modal = getElement('.modal-container');
const modalOverlay = getElement('.modal-overlay');
const bodyElement = getElement('body');
const modalItems = getElement('.modal-items');
const modalFooter = getElement('.modal-footer');
const imageContainer = getElement('.image-container');
const closeButton = getElement('.modal-close-btn');
const prevButton = getElement('.prev-button');
const nextButton = getElement('.next-button');

// open modal when clicking on a thumbnail
const openModal = () => {
  modalOverlay.classList.add('show-modal');
  modal.classList.add('show-modal');
  bodyElement.classList.add('disable-scroll');
};

// close modal when clicking on the X icon
const closeModal = () => {
  modalOverlay.classList.remove('show-modal');
  modal.classList.remove('show-modal');
  bodyElement.classList.remove('disable-scroll');
};

// render main section within the modal which is used for both creating and updating
const renderModalItemSection = imageIndex => {
  const modalImageParent = createElement('div');
  modalImageParent.className = 'modal-image-parent';
  const mainModalImage = createElement('img');
  mainModalImage.className = `modal-image modal-image-${imageIndex}`;
  modalImageParent.appendChild(mainModalImage);
  mainModalImage.src = getElement(`.image-number-${imageIndex}`).src;
  getElement('.modal-items').appendChild(modalImageParent);
};

// render modal footer section which is used for both creating and updating
const renderModalFooter = imageIndex => {
  let previousImageIndex = 0;
  let nextImageIndex = 0;

  if (imageIndex >= images.length - 1) {
    previousImageIndex = Number(imageIndex) - 1;
    nextImageIndex = 0;
  } else if (imageIndex < 1) {
    previousImageIndex = images.length - 1;
    nextImageIndex = Number(imageIndex) + 1;
  } else {
    previousImageIndex = Number(imageIndex) - 1;
    nextImageIndex = Number(imageIndex) + 1;
  }

  // create modal footer parent which will be the anchor for all the modal image tiles
  const modalFooterImageParent = createElement('div');
  modalFooterImageParent.className = 'modal-footer-image-parent';
  modalFooter.appendChild(modalFooterImageParent);

  // create previous image tile wrapper and append to parent
  const prevModalFooterImageTile = createElement('div');
  prevModalFooterImageTile.className = `modal-footer-image-tile modal-image-tile-${previousImageIndex}`;
  modalFooterImageParent.appendChild(prevModalFooterImageTile);

  // create previous modal image and append to prev image tile wrapper
  const prevModalFooterImage = createElement('img');
  prevModalFooterImage.className = `cursor-pointer modal-footer-image modal-image-${previousImageIndex}`;
  prevModalFooterImage.src = getElement(`.image-number-${previousImageIndex}`).src;
  prevModalFooterImage.dataset.image = previousImageIndex;
  prevModalFooterImageTile.appendChild(prevModalFooterImage);

  // create main image tile wrapper and append to parent
  const mainModalFooterImageTile = createElement('div');
  mainModalFooterImageTile.className = `modal-image-highlight modal-footer-image-tile modal-image-tile-${previousImageIndex}`;
  modalFooterImageParent.appendChild(mainModalFooterImageTile);

  // create main image and append to image tile wrapper
  const mainModalFooterImage = createElement('img');
  mainModalFooterImage.className = `cursor-pointer main-modal-image modal-footer-image modal-image-${imageIndex}`;
  mainModalFooterImage.src = getElement(`.image-number-${imageIndex}`).src;
  mainModalFooterImage.dataset.image = imageIndex;
  mainModalFooterImageTile.appendChild(mainModalFooterImage);

  // create next modal footer image tile wrapper and append to parent
  const nextModalFooterImageTile = createElement('div');
  nextModalFooterImageTile.className = `modal-footer-image-tile modal-image-tile-${previousImageIndex}`;
  nextModalFooterImageTile.dataset.image = previousImageIndex;
  modalFooterImageParent.appendChild(nextModalFooterImageTile);

  // create next modal image and append to its wrapper
  const nextModalFooterImage = createElement('img');
  nextModalFooterImage.className = `cursor-pointer modal-footer-image modal-image-${nextImageIndex}`;
  nextModalFooterImage.src = getElement(`.image-number-${nextImageIndex}`).src;
  nextModalFooterImage.dataset.image = nextImageIndex;
  nextModalFooterImageTile.appendChild(nextModalFooterImage);

  // add event listener to each newly created thumbnail
  getMultipleElements('.modal-footer-image').forEach(selectedImage => {
    eventCreator(selectedImage, 'click', () => {
      updateMainModalImage(selectedImage);
      updateFooterModalImage(selectedImage);
    });
  });
};

// handle error from fetch request
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

// function to create main modal images
const createMainModalImage = element => {
  // remove any existing images within modal
  removeChild(modalItems);

  // render main section within the modal
  const imageIndex = Number(element.target.dataset.image);
  renderModalItemSection(imageIndex);
};

// function to update the main model image by clicking on thumbnail
const updateMainModalImage = element => {
  // remove images within modal
  removeChild(modalItems);

  // render modal item section
  const imageIndex = Number(element.dataset.image);
  renderModalItemSection(imageIndex);
};

// function to create modal footer images
const createModalFooterImages = element => {
  // remove images within modal
  removeChild(modalFooter);

  // render main section within the modal
  const imageIndex = Number(element.target.dataset.image);
  renderModalFooter(imageIndex);
};

// function to update modal footer images
const updateFooterModalImage = element => {
  // remove images within modal
  removeChild(modalFooter);

  // render main section within the modal
  const imageIndex = Number(element.dataset.image);
  renderModalFooter(imageIndex);
};

// function to render thumbnail on the landing page
const renderImages = (imageThumbnailUrl, imageWidth, imageHeight, index) => {
  // thumbnail image display to ensure all images have the same height
  const height = 60;
  const width = Math.round(height * (imageWidth / imageHeight));
  // these elements only appear after a fetch request or a modal has been opened
  const imageContainerChild = getElement('#image-container-child');

  // create image tile div as a container for the image
  const imageTile = createElement('div');
  imageTile.dataset.image = index;
  imageTile.className += `image-tile-number-${index} img-tile-thumbnail cursor-pointer`;
  // add event listener to image tile which opens modal upon click
  eventCreator(imageTile, 'click', openModal);
  eventCreator(imageTile, 'click', createMainModalImage);
  eventCreator(imageTile, 'click', createModalFooterImages);

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
const getImages = event => {
  removeChild(imageContainer);
  const selectedCharacter = event.target.dataset.actress;
  // additional search terms to increase search relevance
  const additionalSearchTerms = ' black panther movie poster';
  const searchTerm = encodeURIComponent(`${selectedCharacter}${additionalSearchTerms}`);
  const host = 'https://api.cognitive.microsoft.com';
  const path = '/bing/v7.0/images/search?q=';
  const sizeFilter = '&w=200&h=200';
  const subscriptionKey = 'aa81bfbc07984ac5b3aac2130e041cb6';
  const url = `${host}${path}${searchTerm}${sizeFilter}`;

  const fetchOptions = {
    method: 'GET',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      Accept: 'application/json'
    }
  };

  fetch(url, fetchOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      // create a child element which will be the main parent for all images created below
      const createImageContainerChild = createElement('div');
      createImageContainerChild.setAttribute('id', 'image-container-child');
      // append this child to the main image container. Creating a single entrypoint
      // allows us to remove the images without looping through all the child elements
      imageContainer.appendChild(createImageContainerChild);
      images = response.value.map((image, index) =>
        renderImages(image.thumbnailUrl, image.thumbnail.width, image.thumbnail.height, index)
      );
    })
    .catch(err => {
      console.log('Fetch response failed with the following error: ', err);
    });
};

// updates with the previous modal image by using the current image index
const updatePrevModalImage = () => {
  const currentIndex = Number(getElement('.main-modal-image').dataset.image);
  let newIndex = currentIndex - 1;

  if (newIndex < 0) {
    newIndex = images.length - 1;
  } else {
    newIndex;
  }
  updateMainModalImage(images[newIndex]);
  updateFooterModalImage(images[newIndex]);
};

// updates with the next modal image by using the current image index
const updateNextModalImage = () => {
  const currentIndex = Number(getElement('.main-modal-image').dataset.image);
  let newIndex = currentIndex + 1;

  if (newIndex > images.length - 1) {
    newIndex = 0;
  } else {
    newIndex;
  }
  updateMainModalImage(images[newIndex]);
  updateFooterModalImage(images[newIndex]);
};

// assign event listener to the character buttons
getMultipleElements('.character-selectors').forEach(character => {
  eventCreator(character, 'click', getImages);
});

// attaching event listener to close modal button
eventCreator(closeButton, 'click', closeModal);

// attaching event listener to prev and next buttons
eventCreator(prevButton, 'click', updatePrevModalImage);
eventCreator(nextButton, 'click', updateNextModalImage);

// });
