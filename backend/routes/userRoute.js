import express from "express";
import { getUserById, createUser } from "../controller/userController.js";

const router = express.Router();

router.get("/users/:id", getUserById);
router.post("/users", createUser);

export default router;
