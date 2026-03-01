import { Router } from "express";
import rateLimit from "express-rate-limit";
import Lead from "../models/Lead.js";

const router = Router();

const leadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Too many requests. Please try again later.",
  },
});

function sanitize(value) {
  return String(value || "").trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9+\-\s()]{7,20}$/.test(phone);
}

router.post("/", leadLimiter, async (req, res, next) => {
  try {
    const fullName = sanitize(req.body.fullName);
    const email = sanitize(req.body.email).toLowerCase();
    const phone = sanitize(req.body.phone);
    const message = sanitize(req.body.message);
    const website = sanitize(req.body.website); // honeypot

    if (website) {
      return res.status(200).json({ ok: true });
    }

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        ok: false,
        message: "Full name, email, and phone are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        ok: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({
        ok: false,
        message: "Please enter a valid phone number.",
      });
    }

    await Lead.create({
      fullName,
      email,
      phone,
      message,
      source: "website-contact-form",
      ip: req.ip || "",
      userAgent: req.get("user-agent") || "",
    });

    return res.status(201).json({
      ok: true,
      message: "Lead captured successfully.",
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
