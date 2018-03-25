# Welcome to Slakanda

Use the Bing API to retrieve images of various characters from the incredible Black Panther movie. Display the images using a lighthouse effect.

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

* [ ] Create checklist for the assignment
* [ ] Access the Bing image search API and successfully retrieve data from it;
* [ ] Display that data on a page;
* [ ] Update the UI of a page without refreshing (AJAX/fetch)
* [ ] Build a polished user experience that makes people smile
* [ ] Do all of the above using only native JavaScript (no libraries such as jQuery or React, although CSS and JavaScript preprocessors and polyfills are fine).
* [ ] Stick to JavaScript (e.g. not TypeScript or similar languages) for this exercise, and don't cheat
* [ ] Modular code using ES6
* [ ] Scalable canvas (responsive)
* [ ] Works on core browsers, Chrome, Safari, Firefox, and Edge
* [ ] Write unit tests ( if they can run locally even better)
* [ ] Detailed comments everywhere
* [ ] Share my rationale
* [ ] Consistent css style
* [ ] Use eslint-airbnb and prettier
* [ ] Performance
* [ ] Code readability and organization
* [ ] Think carefully about error handling
* [ ] Make sure it works
* [ ] Be gracious with documentation

* [ ] Wireframes (Balsamic or Photoshop)
* [ ] Find websafe fonts (https://websitesetup.org/web-safe-fonts-html-css/)Verdana
* [ ] Explore UI tests as well as API tests (http://amzotti.github.io/testing/2015/03/16/what-is-the-difference-between-a-test-runner-testing-framework-assertion-library-and-a-testing-plugin/)
* [ ] Build a rough version just to gain an understanding of potential things to consider
* [ ] Use these bios for when you hover over a character (https://www.flickeringmyth.com/2018/01/marvel-releases-seven-character-bios-black-panther/)
* [ ] Setup your server environment on Azure
* [ ] Host service and purchase Url (host on Azure and purchase SlackPanther.com)
* [ ] Record background music and host on CDN (https://cdnresoltzcus.blob.core.windows.net/content/videos/trainers/Test/slakanda.m4a)
* [ ] Rebuild using continuous deployment

### Testing

Testing:

* [ ] Write a tests tests to access the API and retrieve search results for each of the Black Panther characters.

Files to modify:

* `test/test.js`
