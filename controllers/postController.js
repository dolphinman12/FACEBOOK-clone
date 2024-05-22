import db from '../models/index.js';

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await db.Post.create({ title, content, authorId: req.user.userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      include: [{ model: db.User, as: 'author', attributes: ['username'] }]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const post = await db.Post.findByPk(id);
  
      if (post.authorId !== req.user.userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      post.title = title;
      post.content = content;
      await post.save();
  
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await db.Post.findByPk(id);
  
      if (post.authorId !== req.user.userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      await post.destroy();
      res.status(204).json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  