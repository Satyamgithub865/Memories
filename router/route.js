import express from 'express'
import { signupUser, loginUser } from '../controller/user-controller.js';
import { createPost, commentPost, getPostById, deletePost, getAllPosts, likePost, updatePost, getPostsBySearch } from '../controller/post-controller.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/user/signup', signupUser);
router.post('/user/login', loginUser);
router.get('/posts/get-all-post', getAllPosts);
router.get('/posts/post/:id', getPostById);
router.post('/posts/create-post', authenticate, createPost);
router.post('/posts/update-post/:id', authenticate, updatePost);
router.delete('/posts/delete-post/:id', authenticate, deletePost);
router.post('/posts/like-post/:id', authenticate, likePost);
router.post('/posts/comment-post/:id', authenticate, commentPost);
router.get('/posts/search', getPostsBySearch);

export default router;