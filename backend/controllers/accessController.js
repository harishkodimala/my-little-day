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
// UNLOCK APP
// ==========================================

const unlockApp = async (req, res) => {

  try {

    const { code } = req.body


    if (!code) {

      return res.status(400).json({
        success: false,
        message: "Secret code is required",
      })

    }


    const providedCode =
      String(code).trim()

    const expectedCode =
      String(
        process.env.APP_SECRET || ""
      ).trim()


    const isValid =
      providedCode.length ===
        expectedCode.length &&
      crypto.timingSafeEqual(
        Buffer.from(providedCode),
        Buffer.from(expectedCode)
      )


    if (!isValid) {

      return res.status(401).json({
        success: false,
        message: "Incorrect secret code 💔",
      })

    }


    // Create a simple signed session value.
    // The actual secret is never sent to frontend.

    const sessionValue = "unlocked"

    const signature =
      createSignature(sessionValue)


    const sessionCookie =
      `${sessionValue}.${signature}`


    res.cookie(
      "app_session",
      sessionCookie,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          process.env.NODE_ENV ===
          "production"
            ? "none"
            : "lax",

        maxAge:
          1000 *
          60 *
          60 *
          24 *
          7,

        path: "/",
      }
    )


    return res.status(200).json({

      success: true,

      message: "Welcome back 🌸",

    })

  } catch (error) {

    console.error(
      "Unlock error:",
      error
    )

    return res.status(500).json({

      success: false,

      message:
        "Unable to unlock the app",

    })

  }
}

// ==========================================
// CHECK ACCESS
// ==========================================

const checkAccess = (req, res) => {

  return res.status(200).json({
    success: true,
    unlocked: true,
  })

}

// ==========================================
// LOCK APP
// ==========================================

const lockApp = (req, res) => {

  res.clearCookie(
    "app_session",
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV === "production",

      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",

      path: "/",
    }
  )

  return res.status(200).json({
    success: true,
    message: "App locked 🔒",
  })
}

module.exports = {
  unlockApp,
  checkAccess,
  lockApp,
}