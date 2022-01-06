const express = require("express");
const { getAllProducts, createProduct, updateProducts, deleteProducts, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorisedRoles} = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products/new").post(isAuthenticatedUser,authorisedRoles("admin"), createProduct);

router.route("/admin/products/:id").put(isAuthenticatedUser, authorisedRoles("admin"), updateProducts).delete(isAuthenticatedUser,authorisedRoles("admin"), deleteProducts)


router.route("/product/:id").get(getProductDetails);


module.exports = router