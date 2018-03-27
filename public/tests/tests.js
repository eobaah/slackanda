console.log(
  "Welcome to the Slackanda testing ground. To run a test, type testSearch() in the console and type enter the names of any of the three characters into the function. For example, testSearch('nakia') or testSearch(character1) will return the search results. The search can be retrieved using the variable names characters1, character2, and character3 or typing the string of one of the actresses 'okoye','nakia',and 'shuri.'"
);

const slackpantherTest = {};

const character1 = 'okoye';
const character2 = 'nakia';
const character3 = 'shuri';

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
const testSearch = actress => {
  if (actress === undefined) {
    return 'Please check the spelling of the input and try again';
  }
  if (
    actress.toLowerCase() === character1.toLowerCase() ||
    actress.toLowerCase() === character2.toLowerCase() ||
    actress.toLowerCase() === character3.toLowerCase()
  ) {
    const selectedCharacter = actress;
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
        response = response.value.length;
        if (response => 1) {
          console.log('the test successfully retrieved ' + response + ' results.');
        } else {
          console.log('unfortunately, the test failed');
        }
      })
      .catch(err => {
        console.log('Fetch response failed with the following error: ', err);
      });
  } else {
    return 'Please check the spelling of the input and try again';
  }
};
