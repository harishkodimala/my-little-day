const crypto = require("crypto")


// ==========================================
// CREATE SIGNATURE
// ==========================================

function createSignature(value) {

  return crypto
    .createHmac(
      "sha256",
      process.env.APP_SECRET
    )
    .update(value)
    .digest("hex")
}


// ==========================================
// VERIFY APP ACCESS
// ==========================================

const requireAccess = (
  req,
  res,
  next
) => {

  try {

    const session =
      req.cookies?.app_session


    if (!session) {

      return res.status(401).json({
        success: false,
        message: "App is locked 🔒",
      })

    }


    const parts =
      session.split(".")


    if (parts.length !== 2) {

      return res.status(401).json({
        success: false,
        message: "Invalid session",
      })

    }


    const [
      sessionValue,
      receivedSignature,
    ] = parts


    const expectedSignature =
      createSignature(sessionValue)


    const isValid =
      receivedSignature.length ===
        expectedSignature.length &&
      crypto.timingSafeEqual(
        Buffer.from(receivedSignature),
        Buffer.from(expectedSignature)
      )


    if (!isValid) {

      return res.status(401).json({
        success: false,
        message: "Invalid session",
      })

    }


    next()

  } catch (error) {

    console.error(
      "Access middleware error:",
      error
    )

    return res.status(500).json({
      success: false,
      message:
        "Unable to verify access",
    })

  }
}


module.exports = requireAccess