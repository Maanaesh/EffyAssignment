import express from "express";
import { addUser, createCompany, deleteCompany, getCompanies, getCompanyById, removeUser, updateCompany } from "../controllers/companyController.js";
const router = express.Router();
router.post("/create",createCompany);
router.get("/",getCompanies);
router.get("/:id",getCompanyById);
router.put("/:id",updateCompany);
router.delete("/:id",deleteCompany);
router.put('/:companyId/user/:userId/add', addUser);
router.delete('/:companyId/user/:userId/delete',removeUser);

export default router;