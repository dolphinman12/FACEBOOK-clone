import db from '../models/index.js';

export const createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const comment = await db.Comment.create({ content, postId, userId: req.user.userId });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await db.Comment.findAll({
      where: { postId },
      include: [{ model: db.User, as: 'user', attributes: ['username'] }]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateComment = async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const comment = await db.Comment.findByPk(id);
  
      if (comment.userId !== req.user.userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      comment.content = content;
      await comment.save();
  
      res.json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  export const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await db.Comment.findByPk(id);
  
      if (comment.userId !== req.user.userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      await comment.destroy();
      res.status(204).json({ message: 'Comment deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  