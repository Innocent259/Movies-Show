import like from '../assets/like.jpeg';
import cancel from '../assets/xmark-solid.svg';

const fetchMovies = async () => {
  const response = await fetch('https://api.tvmaze.com/shows');
  const data = await response.json();
  const tobeShown = data.slice(0, 30);
  document.querySelector('.movies-length').textContent = `Movies(${tobeShown.length})`;
  const moviesContainer = document.querySelector('.main-content');
  tobeShown.forEach((show) => {
    const listContainer = document.createElement('div');
    listContainer.classList.add('list-container');
    listContainer.innerHTML = `
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
    `;
    listContainer.querySelector('.commentBtn').addEventListener('click', () => {
      const popup = document.createElement('div');
      popup.className = 'popup';
      popup.innerHTML = `
        <div class="popup-container">
          <div class="image-cancelbtn">
            <img src="${show.image.original}" class="id-image">
            <img src="${cancel}" class="cancel-img">
          </div>
          <h2 class="moviee">${show.name}</h2>
          <span class="sub-details">
            <p>Release date: ${show.premiered}</p>
            <a href="${show.officialSite}">Watch Movie</a>
          </span>
          <div class="comment-container">
            <h2 class="comment-title">Add Comment</h2>
            <form class="form">
              <input type="text" placeholder="Username">
              <textarea placeholder="Your insight"></textarea>
              <button type="submit" class="submit-btn">Comment</button>
            </form>
          </div>
        </div>
      `;
      const cancelButton = popup.querySelector('.cancel-img');
      cancelButton.addEventListener('click', () => {
        popup.remove();
      });
      document.body.prepend(popup);
    });
    moviesContainer.appendChild(listContainer);
  });
};

export default fetchMovies;
