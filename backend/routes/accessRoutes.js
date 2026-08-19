const express = require("express")

const {
  unlockApp,
  checkAccess,
  lockApp,
} = require("../controllers/accessController")

const requireAccess =
  require("../middleware/accessMiddleware")

const router = express.Router()


// ==========================================
// UNLOCK
// ==========================================

router.post(
  "/unlock",
  unlockApp
)


// ==========================================
// CHECK SESSION
// ==========================================

router.get(
  "/check",
  requireAccess,
  checkAccess
)


// ==========================================
// LOCK
// ==========================================

router.post(
  "/lock",
  requireAccess,
  lockApp
)


module.exports = router