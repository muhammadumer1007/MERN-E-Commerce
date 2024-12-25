import express from "express";
import { authMiddleware, login, logout, register } from "../../controllers/auth/user-controller.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        message: "Success",
        success: true,
        message: "Authenticated user!",
        user,
    });
});

export default router;
