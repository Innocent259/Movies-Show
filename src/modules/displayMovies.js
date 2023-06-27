import like from '../assets/like.jpeg';

const fetchMovies = async () => {
  const response = await fetch('https://api.tvmaze.com/shows');
  const data = await response.json();
  const tobeShown = data.slice(0, 30);
  document.querySelector('.movies-length').textContent = `Movies(${tobeShown.length})`;
  const moviesContainer = document.querySelector('.main-content');
  tobeShown.forEach((show) => {
    moviesContainer.innerHTML += `
        <div class="list-container">
          <img src="${show.image.medium}" alt="image"/> 
          <div class="listLikeGroup">
            <div class="elementName">
              ${show.name}
            </div>
            <div class="likeCounter">
              <img class="likeImg likeBtn" src="${like}" alt="like logo"/> 
            </div>
          </div>
          <button class="commentBtn">Comments</button>
        </div>
      `;
  });
};

export default fetchMovies;