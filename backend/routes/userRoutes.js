const express = require("express");
const {isAuthenticatedUser, authorisedRoles} = require("../middleware/auth")
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser,getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const { createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser ,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile)
router.route("/admin/users").get(isAuthenticatedUser, authorisedRoles("admin"), getAllUser);
router.route("/admin/user/:id")
.get(isAuthenticatedUser, authorisedRoles("admin"), getSingleUser)
.put(isAuthenticatedUser, authorisedRoles("admin"), updateUserRole)
.delete(isAuthenticatedUser, authorisedRoles("admin"), deleteUser)
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview)


module.exports = router;