import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt.js";
import {
  deleteSubDomainData,
  getSubDomainsData,
  registerSubDomainData,
} from "../controllers/subdomain.controller.js";

const router = Router();

// Example route for domain management
router.post("/register",verifyJwt,  registerSubDomainData);
router.get("/listDomains",verifyJwt,  getSubDomainsData);
router.delete("/deleteDomain",verifyJwt,  deleteSubDomainData);

export default router;
