import { Router } from "express";
import PostController from "../controller/PostController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.route('/post').post(authMiddleware, PostController.store).get(PostController.index);

export default router;