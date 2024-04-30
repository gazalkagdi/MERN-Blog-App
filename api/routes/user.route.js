import { deleteUser, test, updateUser } from "../controllers/user.controller.js";
import express from 'express';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;