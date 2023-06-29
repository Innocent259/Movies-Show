import { baseUrl, commentId } from './api.js';

const getComment = async (itemId) => {
  try {
    const response = await fetch(`${baseUrl}/apps/${commentId}/comments?item_id=${itemId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

export default getComment;
