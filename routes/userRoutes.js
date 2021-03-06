const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const reviewRouter = require("../routes/reviewRoutes");

const router = express.Router();

router.use("/:id/reviews", reviewRouter);

router.post("/signup", authController.signup);
// router.use(authController.isLoggedIn);
router
    .route("/login")
    .post(authController.login)
    .get(authController.isLoggedIn);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.get("/images/:key", userController.getUsersProfilePicture);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
    "/updateMe",
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
);

router.use(authController.restrictTo("admin"));

router.delete("/deleteMe", userController.deleteMe);

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
