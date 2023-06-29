import countComments from '../commentCounter.js';
import getComment from '../getComments.js';

jest.mock('../getComments.js');

describe('countComments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct comment count when comments are available', async () => {
    const itemId = '123';
    const mockComments = [
      { id: '1', text: 'Comment 1' },
      { id: '2', text: 'Comment 2' },
      { id: '3', text: 'Comment 3' },
    ];

    getComment.mockResolvedValue(mockComments);

    const commentCount = await countComments(itemId);

    expect(getComment).toHaveBeenCalledWith(itemId);
    expect(commentCount).toBe(mockComments.length);
  });

  it('should return 0 when no comments are available', async () => {
    const itemId = '123';

    getComment.mockResolvedValue([]);

    const commentCount = await countComments(itemId);

    expect(getComment).toHaveBeenCalledWith(itemId);
    expect(commentCount).toBe(0);
  });
});
