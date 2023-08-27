import { Router } from "express";
import { body } from "express-validator";
import { handleError } from "./modules/Validation";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  update,
} from "./handler/product";
import {
  create,
  deleteUpdate,
  getAll,
  getOne,
  updated,
} from "./handler/update";
const router = Router();

/**
 * product
 */

router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", body("name").isString(), handleError, createProduct);
router.put("/product/:id", body("name").isString(), handleError, update);
router.delete("/product/:id", deleteProduct);

/**
 * update
 */

router.get("/update", getAll);
router.get(
  "/update/:id",

  getOne
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),

  create
);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("version").optional(),
  body("status")
    .isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED", "DECLINED"])
    .optional(),
  updated
);
router.delete("/update/:id", deleteUpdate);

/**
 * updatepoint
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.put(
  "/updatepoint/:id",
  body("name").optional(),
  body("description").optional(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
