import like from '../assets/like.jpeg';
import cancel from '../assets/xmark-solid.svg';
import getComment from './getComments.js';
import postComment from './postComment.js';

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
    const commentButton = listContainer.querySelector('.commentBtn');
    commentButton.addEventListener('click', async () => {
      const popup = document.createElement('div');
      popup.className = 'popup';
      const comments = await getComment(show.id);
      const commentsHTML = Array.isArray(comments) ? comments.map((comment) => `<ul>${comment.username}: ${comment.comment}</ul>`).join('') : '';

      popup.innerHTML = `
        <div class="popup-container">
          <div class="image-cancelbtn">
            <img src="${show.image.original}" class="id-image">
            <img src="${cancel}" class="cancel-img">
          </div>
          <h2 class="movie">${show.name}</h2>
          <span class="sub-details">
            <p>Release date: ${show.premiered}</p>
            <a href="${show.officialSite}">Watch Movie</a>
          </span>
          <div class="comment-container">
            <div class="comments">
              <p>Comments(${comments.length})</p>
              ${commentsHTML}
            </div>
            <h2 class="comment-title">Add Comment</h2>
            <form class="form">
              <input type="text" id="usernameInput" placeholder="Username">
              <textarea id="commentInput" placeholder="Your insight"></textarea>
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

      const form = popup.querySelector('.form');
      const usernameInput = form.querySelector('#usernameInput');
      const commentInput = form.querySelector('#commentInput');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const comment = commentInput.value;
        await postComment({
          item_id: show.id,
          username,
          comment,
        });
        const updatedComments = await getComment(show.id);
        const updatedCommentsHTML = Array.isArray(updatedComments) ? updatedComments.map((comment) => `<ul>${comment.username}: ${comment.comment}</ul>`).join('') : '';
        const commentsContainer = popup.querySelector('.comments');
        commentsContainer.innerHTML = `
          <p>Comments(${updatedComments.length})</p>
          ${updatedCommentsHTML}
        `;

        usernameInput.value = '';
        commentInput.value = '';
      });
    });

    moviesContainer.appendChild(listContainer);
  });
};

export default fetchMovies;
