import { baseUrl, likesId } from './api.js';

export const postLikes = async (data) => {
  await fetch(`${baseUrl}/apps/${likesId}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getLikes = async () => {
  try {
    const response = await fetch(`${baseUrl}/apps/${likesId}/likes`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};
