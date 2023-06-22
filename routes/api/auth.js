const express = require("express");
const { validateBody, authenticate } = require("../../middelwares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();

// more correct to create model first
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// more correct to create model first
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
