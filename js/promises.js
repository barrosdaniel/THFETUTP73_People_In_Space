const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make AJAX request to retrieve data from astros API, passing in function to retrieve profiles from wiki API
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.onload = () => {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        reject(Error(xhr.statusText));
      }
    };

    xhr.onerror = () => reject(Error('A network error occurred.'));

    xhr.send();

  });
}

// Function passed into AJAX request that is executed after the AJAX request is finished. Function retrieves profiles from wiki API and calls function to generate HTML tile with each record data
function getProfiles(json) {
  const profiles = json.people.map(person => {
    return getJSON(wikiUrl + person.name);
  });
  return Promise.all(profiles);
};

// Generate the markup for each profile
function generateHTML(data) {
  data.map(person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    if (person.type === "standard") {
      section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>`;
    } else {
      section.innerHTML = `
      <h2>${person.title}</h2>
      <p>No description available</p>`;
    }
  })
}

// Click button event listener
btn.addEventListener('click', (event) => {
  event.target.textContent = 'Loading...';

  getJSON(astrosUrl)
    .then(getProfiles)
    .then(generateHTML)
    .catch(err => {
      peopleList.innerHTML = `<h3>Something went wrong.</h3>`
      console.log(err)
    })
    .finally(() => event.target.remove())
});