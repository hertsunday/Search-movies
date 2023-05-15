const searchInput = document.querySelector(".search");
const itemWrapper = document.querySelector("main");

let displayMatches = (matches) => {
  itemWrapper.innerHTML = "";

  if (!matches) {
    return (itemWrapper.innerHTML = '<p class="no-search">Sorry, no movies were found matching your search.</p>');
  }
  for (let match of matches) {
    itemWrapper.insertAdjacentHTML("beforeend",
  `<a href="https://www.imdb.com/title/${match.imdbID}" target="_blank">
          <div class="movie-item" style="background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)),
            url(${match.Poster})">
            <h3>${match.Title}</h3>
            <p>Release Year: ${match.Year}</p>
          </div>
        </a>`
    );
  }
};
let getMovieData = () => {
  let searchText = searchInput.value.trim().toLowerCase();

  if (searchText) {
    let responsePromise = fetch(`https://www.omdbapi.com/?apikey=e732dbce&s=${searchText}`);
    let handleResponse = (responseObj) => responseObj.json();

    responsePromise.then(handleResponse).then((data) => displayMatches(data.Search));
  } else {
    itemWrapper.innerHTML = `<p class="no-search">Use the search box to find details about a specific movie</p>`;
  }
};

let init = () => {
  searchInput.addEventListener("input", getMovieData);
};

init();
