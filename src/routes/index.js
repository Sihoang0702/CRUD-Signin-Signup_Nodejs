import { Router } from "express";
import routerProducts from "./product.js";
import routerAuth from "./auth.js";
const router = Router();

router.use("/products", routerProducts);
router.use("/auth", routerAuth);

export default router;
