import { Router } from "express";
import { createPassword, deletePassword, getPasswords, updatePassword } from "../controllers/password.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/password").post(createPassword).get(getPasswords);

router.route("/:id").delete(deletePassword).patch(updatePassword);


export default router;