import { baseUrl, commentId } from './commentApi.js';

const getComment = async () => {
  const res = await fetch(`${baseUrl}/apps/${commentId}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
};
export default getComment;