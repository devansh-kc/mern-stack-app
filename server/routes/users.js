import express from "express";
import {} from "../controllers/posts.js";
const router = express.Router();
/* The code is defining two routes for the Express router: */
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
