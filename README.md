![](https://cdnresoltzcus.blob.core.windows.net/images/thumbnails/trx/slack-panther-logo.png)

# Welcome to Slakanda

Use the Bing search API to retrieve images of various characters from the incredible Black Panther movie. Display the images using a lighthouse effect.

My personal goals are the following:

* Build something pleasant!
* Build something simple
* Build for performance to enhance productivity

## Instructions for setup

The app uses a simple file structure for an Express web app server that renders views using HTML.

```sh
public/               # static assets
  css/                # css stylesheets
  js/                 # JavaScript files
  img/                # Image assets will be stored here or on a CDN hosted on Azure
  test/                 # test files for the application
views/                # html files
```

## Setting up your config

Run the command in the terminal so that the config loads correctly
`$ cp .env.template .env`

## Installing your dependencies

Run the following command in the terminal:
`$ yarn install` or `$ npm install`... I'm not judging you.

### Starting your development server

Run the following command in the terminal:
`$ yarn dev` or `$ npm dev`

### Requirement overview

* [x] Create checklist for the assignment
* [x] Access the Bing image search API and successfully retrieve data from it;
* [x] Display that data on a page;
* [x] Update the UI of a page without refreshing (AJAX/fetch)
* [ ] Build a polished user experience that makes people smile
* [x] Do all of the above using only native JavaScript (no libraries such as jQuery or React, although CSS and JavaScript preprocessors and polyfills are fine).
* [x] Stick to JavaScript (e.g. not TypeScript or similar languages) for this exercise, and don't cheat
* [x] Modular code using ES6
* [x] Scalable canvas (responsive)
* [x] Works on core browsers, Chrome, Safari, Firefox, and Edge
* [ ] Write unit tests ( if they can run locally even better)
* [x] Detailed comments everywhere
* [x] Share my rationale
* [x] Consistent css style
* [x] Use eslint-airbnb and prettier
* [ ] Performance
* [x] Code readability and organization
* [x] Think carefully about error handling
* [ ] Make sure it works
* [x] Be gracious with documentation

### My checklist for execution

* [x] Setup Node environment on local repo
* [x] Setup airbnb linter and prettier
* [x] Create Azure resource
* [x] Create image folders and deploy to CDN
* [x] Connect local repo to Azure cloud resource
* [x] Purchase www.slackpanther.com domain and connect to Azure resource
* [x] Diagram basic experience using Balsamic or Photoshop
  * [x] ![Landing page](https://cdnresoltzcus.blob.core.windows.net/images/thumbnails/trx/landing-screen.png)
  * [x] ![Landing page](https://cdnresoltzcus.blob.core.windows.net/images/thumbnails/trx/lighthouseview.png)
* [x] Create HTML and CSS for baseline experience. Slackanda logo and view three buttons
* [x] Organize CSS where the properties for each class are in alphabetical order
* [x] Use descriptive enough variable names where additional documentation isn't needed. Then document anyway :)
* [x] We’ll need to create empty divs for the modal overlay and the modal itself
* [x] Connect with Bing API (WARNING! I’ll be exposing subscription key and as a stretch goal, I should have a solution to resolve this. Perhaps use local storage for the use to input their key in the browser). See example here (https://docs.microsoft.com/en-us/azure/cognitive-services/bing-image-search/tutorial-bing-image-search-single-page-app-source)
* [x] Use a fetch API to update a page with new results without refreshing the browser. Make sure we handle errors with the request.
* [x] Display results in the console and decide which information we want. Potential to use filter or map to get the exact data we need. However, make sure we assign an ID using the index of each element so we can retrieve them later.
* [ ] Store the retrieved elements in an Array or Hash to be used for the carousel. Warning! It's not good practice to store random global variables... makes me miss react and redux.
* [x] Once data is displayed, then we need to add an event listener to each image element so that clicking on the image opens a modal.
* [ ] Inside the modal, the image clicked should be displayed. This means we have to remove the images previously displayed in the modal.
* [x] Create left and right arrows in the modal.
* [ ] Clicking on either the left or the right should access the object of images based on the main image displayed in the modal and decrease or increase the index, thus changing the image URL of the main image.
* [ ] Handle errors for the beginning and end of the carousel

## Tests

* [ ] Write 3 unit tests for the Bing Search API to successfully retrieve results that contain images.
* [ ] Test UI components (stretch) using headless browser tests

## Stretch

* [x] Host site images on CDN
* [x] Create fun logo using Photoshop
* [ ] Preload images on landing page so they are cached to the browser for faster rendering.
* [ ] Create a cool parallax effect
* [ ] Display video in the background on landing page

- `test/test.js`
