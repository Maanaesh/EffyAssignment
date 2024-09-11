import express from "express";
import { activateUser, createUser, deactivateUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userControllers.js";
const router = express.Router();

router.post("/create",createUser);
router.get("/",getUsers);
router.get("/:id",getUserById);
router.put('/:id',updateUser);
router.put('/:id/deactivate', deactivateUser);
router.put('/:id/activate', activateUser);
router.delete('/:id',deleteUser);
export default router;
