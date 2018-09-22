'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // for development purposes, we want to use a prompt to obtain the subcription key
  // we'll use local storage for the user's subscription key or store the information in the cookie

  // #~*~*~*~**~*~**~*~**~*~**~*~*~*~**~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*#
  //    FETCH REQUEST
  // #~*~*~*~**~*~**~*~**~*~**~*~*~*~**~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*#

  // handle error from fetch request
  const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };

  // fetch request to retrieve images from search api
  const getImages = event => {
    removeChildren(imageContainer);
    const selectedCharacter = event.target.dataset.actress;
    // additional search terms to increase search relevance
    const additionalSearchTerms = ' black panther movie poster';
    const searchTerm = encodeURIComponent(`${selectedCharacter}${additionalSearchTerms}`);
    const host = 'https://api.cognitive.microsoft.com';
    const path = '/bing/v7.0/images/search?q=';
    const sizeFilter = '&w=200&h=200';
    const subscriptionKey = '56dffb127d604bc7b64aecfd2919c437';
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

  // #~*~*~*~**~*~**~*~**~*~**~*~*~*~**~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*#
  //    BASE JAVASCRIPT
  // #~*~*~*~**~*~**~*~**~*~**~*~*~*~**~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*#

  let images = [];

  // helper functions to get DOM elements
  const createElement = elementType => document.createElement(elementType);
  const getElementBySelector = className => document.querySelector(className);
  const getMultipleElementsBySelector = className => document.querySelectorAll(className);

  // helper function to add an event listener to an element
  const eventCreator = (button, eventType, func) => {
    if (button) {
      button.addEventListener(eventType, event => {
        func(event);
      });
    }
  };

  // helper function to remove child elements based on the parent
  const removeChildren = parentElement => {
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  };

  // get DOM elements using helper functions
  const modal = getElementBySelector('.modal-container');
  const modalOverlay = getElementBySelector('.modal-overlay');
  const bodyElement = getElementBySelector('body');
  const modalItems = getElementBySelector('.modal-items');
  const modalFooter = getElementBySelector('.modal-footer');
  const imageContainer = getElementBySelector('.image-container');
  const closeButton = getElementBySelector('.modal-close-btn');
  const prevButton = getElementBySelector('.prev-button');
  const nextButton = getElementBySelector('.next-button');

  // #~*~*~*~**~*~**~*~**~*~**~*~*~*~**~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*#
  //    MODAL
  // #~*~*~*~**~*~**~*~**~*~**~*~*~*~**~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*#

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

  // function to create an image tile element, it's child image element, and append
  // the image tile to a parent element which is attached to a dom element in the HTML
  const createParentAndChildElements = (
    grandParentElement,
    createdParentElement,
    createdParentClassName,
    createdChildElement,
    createdChildClassName,
    referenceImageClass,
    index
  ) => {
    createdParentElement = createElement('div');
    createdParentElement.className = createdParentClassName;
    createdParentElement.dataset.image = index;
    createdChildElement = createElement('img');
    createdChildElement.className = createdChildClassName;
    createdChildElement.dataset.image = index;
    createdParentElement.appendChild(createdChildElement);
    createdChildElement.src = getElementBySelector(referenceImageClass).src;
    getElementBySelector(grandParentElement).appendChild(createdParentElement);
  };

  // render main section within the modal which is used for both creating and updating
  const renderModalItemSection = imageIndex => {
    // create image
    createParentAndChildElements(
      '.modal-items',
      'div',
      'modal-image-parent',
      'img',
      `modal-image modal-image-${imageIndex}`,
      `.image-number-${imageIndex}`,
      imageIndex
    );
  };

  // render modal footer section which is used for both creating and updating
  const renderModalFooter = imageIndex => {
    let previousPreviousImageIndex = 0;
    let previousImageIndex = 0;
    let nextImageIndex = 0;
    let nextNextImageIndex = 0;

    if (imageIndex >= images.length - 2) {
      previousPreviousImageIndex = Number(imageIndex) - 2;
      previousImageIndex = previousPreviousImageIndex + 1;
      nextImageIndex = images.length - 1;
      nextNextImageIndex = 0;
    } else if (imageIndex >= images.length - 1) {
      previousPreviousImageIndex = images.length - 3;
      previousImageIndex = previousPreviousImageIndex + 1;
      nextImageIndex = 0;
      nextNextImageIndex = nextImageIndex + 1;
    } else if (imageIndex < 1) {
      previousPreviousImageIndex = images.length - 2;
      previousImageIndex = previousPreviousImageIndex + 1;
      nextImageIndex = Number(imageIndex) + 1;
      nextNextImageIndex = nextImageIndex + 1;
    } else if (imageIndex < 2) {
      previousPreviousImageIndex = Number(imageIndex) - 1;
      previousImageIndex = 0;
      nextImageIndex = Number(imageIndex) + 1;
      nextNextImageIndex = nextImageIndex + 1;
    } else {
      previousPreviousImageIndex = Number(imageIndex) - 2;
      previousImageIndex = previousPreviousImageIndex + 1;
      nextImageIndex = Number(imageIndex) + 1;
      nextNextImageIndex = nextImageIndex + 1;
    }

    // create modal footer parent which will be the anchor for all the modal image tiles
    const modalFooterImageParent = createElement('div');
    modalFooterImageParent.className = 'modal-footer-image-parent';
    modalFooter.appendChild(modalFooterImageParent);

    // create previous previous modal footer image tile wrapper and append to parent
    // create previous previous modal image and append to its wrapper
    createParentAndChildElements(
      '.modal-footer-image-parent',
      'div',
      `modal-footer-image-tile modal-image-tile-${previousPreviousImageIndex}`,
      'img',
      `cursor-pointer modal-footer-image modal-image-${previousPreviousImageIndex}`,
      `.image-number-${previousPreviousImageIndex}`,
      previousPreviousImageIndex
    );

    // create previous modal footer image tile wrapper and append to parent
    // create previous modal image and append to its wrapper
    createParentAndChildElements(
      '.modal-footer-image-parent',
      'div',
      `modal-footer-image-tile modal-image-tile-${previousImageIndex}`,
      'img',
      `cursor-pointer modal-footer-image modal-image-${previousImageIndex}`,
      `.image-number-${previousImageIndex}`,
      previousImageIndex
    );

    // create next modal footer image tile wrapper and append to parent
    // create next modal image and append to its wrapper
    createParentAndChildElements(
      '.modal-footer-image-parent',
      'div',
      `modal-footer-image-tile modal-image-tile-${nextImageIndex}`,
      'img',
      `cursor-pointer modal-footer-image modal-image-${nextImageIndex}`,
      `.image-number-${nextImageIndex}`,
      nextImageIndex
    );

    // create next next modal footer image tile wrapper and append to parent
    // create next next modal image and append to its wrapper
    createParentAndChildElements(
      '.modal-footer-image-parent',
      'div',
      `modal-footer-image-tile modal-image-tile-${nextNextImageIndex}`,
      'img',
      `cursor-pointer modal-footer-image modal-image-${nextNextImageIndex}`,
      `.image-number-${nextNextImageIndex}`,
      nextNextImageIndex
    );

    // add event listener to each newly created thumbnail
    getMultipleElementsBySelector('.modal-footer-image').forEach(selectedImage => {
      eventCreator(selectedImage, 'click', () => {
        updateMainModalImage(selectedImage);
        updateFooterModalImage(selectedImage);
      });
    });
  };

  // function to create main modal images
  const createMainModalImage = element => {
    // remove any existing images within modal
    removeChildren(modalItems);

    // render main section within the modal
    const imageIndex = Number(element.dataset.image);
    renderModalItemSection(imageIndex);
  };

  // function to update the main model image by clicking on thumbnail
  const updateMainModalImage = element => {
    // remove images within modal
    removeChildren(modalItems);

    // render modal item section
    const imageIndex = Number(element.dataset.image);
    renderModalItemSection(imageIndex);
  };

  // function to create modal footer images
  const createModalFooterImages = element => {
    // remove images within modal
    removeChildren(modalFooter);

    // render main section within the modal
    const imageIndex = Number(element.dataset.image);
    renderModalFooter(imageIndex);
  };

  // function to update modal footer images
  const updateFooterModalImage = element => {
    // remove images within modal
    removeChildren(modalFooter);

    // render main section within the modal
    const imageIndex = Number(element.dataset.image);
    renderModalFooter(imageIndex);
  };

  // function to render thumbnail on the landing page
  const renderImages = (imageThumbnailUrl, imageWidth, imageHeight, index) => {
    // thumbnail image display to ensure all images have the same height
    const height = 100;
    const width = Math.round(height * (imageWidth / imageHeight));

    // these elements only appear after a fetch request or a modal has been opened
    const imageContainerChild = getElementBySelector('#image-container-child');

    // create image tile div as a container for the image
    const imageTile = createElement('div');
    imageTile.dataset.image = index;
    imageTile.className += `img-tile-thumbnail cursor-pointer`;

    // add event listener to image tile which opens modal upon click
    imageTile.addEventListener('click', event => {
      openModal();
      createMainModalImage(event.target);
      createModalFooterImages(event.target);
    });

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

<<<<<<< HEAD
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
    const subscriptionKey = '56dffb127d604bc7b64aecfd2919c437';
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

=======
>>>>>>> e2a188ef32445db9fb82220206b4724e73d397b4
  // updates with the previous modal image by using the current image index
  const updatePrevModalImage = () => {
    const currentIndex = Number(getElementBySelector('.modal-image').dataset.image);
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
    const currentIndex = Number(getElementBySelector('.modal-image').dataset.image);
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
  getMultipleElementsBySelector('.character-selectors').forEach(character => {
    eventCreator(character, 'click', getImages);
  });

  // attaching event listener to close modal button
  eventCreator(closeButton, 'click', closeModal);

  // attaching event listener to prev and next buttons
  eventCreator(prevButton, 'click', updatePrevModalImage);
  eventCreator(nextButton, 'click', updateNextModalImage);
});
