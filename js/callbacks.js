const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make AJAX request to retrieve data from astros API, passing in function to retrieve profiles from wiki API
function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      return callback(data);
    }
  };
  xhr.send();
}

// Function passed into AJAX request that is executed after the AJAX request is finished. Function retrieves profiles from wiki API and calls function to generate HTML tile with each record data
function getProfiles(json) {
  json.people.map(person => {
    getJSON(wikiUrl + person.name, generateHTML);
  });
};

// Generate the markup for each profile
function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  if (data.type === "standard") {
    section.innerHTML = `
      <img src=${data.thumbnail.source}>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>
      `;
  } else {
    section.innerHTML = `
      <h2>${data.title}</h2>
      <p>No description available</p>
  `;
  }
}

// Click button event listener
btn.addEventListener('click', (event) => {
  getJSON(astrosUrl, getProfiles);
  event.target.remove();
});