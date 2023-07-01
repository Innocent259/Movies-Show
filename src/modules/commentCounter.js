import getComment from './getComments.js';

const countComments = async (itemId) => {
  try {
    const comments = await getComment(itemId);
    if (Array.isArray(comments)) {
      return comments.length;
    }
    return 0;
  } catch (error) {
    console.error('Error counting comments:', error);
    return 0;
  }
};

export default countComments;
