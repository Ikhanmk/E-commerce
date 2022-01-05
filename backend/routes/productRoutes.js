const express = require("express");
const { getAllProducts, createProduct, updateProducts, deleteProducts, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorisedRoles} = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/products/new").post(isAuthenticatedUser,authorisedRoles("admin"), createProduct);

router.route("/products/:id").put(isAuthenticatedUser, authorisedRoles("admin"), updateProducts).delete(isAuthenticatedUser,authorisedRoles("admin"), deleteProducts).get(getProductDetails)




module.exports = router