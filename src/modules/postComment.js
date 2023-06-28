import { baseUrl, commentId } from './commentApi.js';

const postComment = async () => {
  const res = await fetch(`${baseUrl}/apps/${commentId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: 'item',
      username: 'userName',
      comment: 'message',
    }),
  });
  const data = await res.json();
  return data;
};

export default postComment;