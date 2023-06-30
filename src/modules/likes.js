import { baseUrl, likesId } from './api.js';

export const involvementApiForLikes = `${baseUrl}/apps/${likesId}/likes`;

const postLikes = async (data) => {
  await fetch(`${baseUrl}/apps/${likesId}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const getLikes = async () => {
  try {
    const response = await fetch(`${baseUrl}/apps/${likesId}/likes`);
    const data = await response.json();
    return data;
  } catch (error) {
    error('Error fetching likes:', error);
    throw error;
  }
};
const displayLikes = async () => {
  const likes = await getLikes();
  likes.forEach((like) => {
    const likeCount = document.querySelectorAll(`.likesCounter-${like.item_id}`);
    likeCount.forEach((span) => {
      span.textContent = like.likes || 0;
    });
  });
};
const likeItem = async (id) => {
  const likeBtn = document.querySelector(`#show-${id} .likeBtn`);
  const likeCount = document.querySelector(`.likesCounter-${id}`);
  if (likeBtn && likeCount) {
    likeBtn.addEventListener('click', async () => {
      likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
      await postLikes({
        item_id: id,
      });
    });
  }
};
export { displayLikes, likeItem };
