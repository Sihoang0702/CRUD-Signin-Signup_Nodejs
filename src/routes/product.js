import { Router } from "express";
import {
  addNew,
  deleteProduct,
  getAll,
  getOne,
  updateProduct,
} from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", checkPermission, addNew);
router.put("/:id", checkPermission, updateProduct);
router.delete("/:id", checkPermission, deleteProduct);

export default router;
