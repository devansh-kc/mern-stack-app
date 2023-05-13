import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPosts,
  getPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.get("/",auth,getPosts)
router.post("/", auth,createPost);
router.get("/",auth,getPost);

router.patch("/:id", auth,updatePost);
router.delete("/:id",auth, deletePost);
router.patch("/:id/likePost",auth, likePost);

export default router;
