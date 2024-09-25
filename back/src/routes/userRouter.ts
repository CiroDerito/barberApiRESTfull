import { Router, Request, Response } from 'express';
import { getUser, getUserById, createUser, loginUser, updateUserProfileImage } from "../controllers/usersController";
import multer from 'multer';

const userRouter: Router = Router();
const upload = multer({ dest: 'uploads/' });

userRouter.put('/update-image/:id', upload.single('profileImage'), updateUserProfileImage);


userRouter.get("/", getUser);

userRouter.get("/:id", getUserById);

userRouter.post("/register", createUser);

userRouter.post("/login", loginUser);

export default userRouter;
