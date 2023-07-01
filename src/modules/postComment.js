import { baseUrl, commentId } from './api.js';

const postComment = async (commentData) => {
  await fetch(`${baseUrl}/apps/${commentId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
};

export default postComment;
