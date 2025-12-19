const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "RAHASIA_KLINIK_GIGI_ADMIN";

// GET semua user
router.get('/', (req, res) => {
    db.query("SELECT iduser, email, password, nama_lengkap FROM `user`", (err, result) => {
        if(err) return res.status(500).send(err);
        res.json(result);
    });
});

// REGISTER ADMIN
router.post("/", (req, res) => {
  const { email, password, nama_lengkap } = req.body;

  if (!email || !password || !nama_lengkap) {
    return res.status(400).json({ message: "Data tidak lengkap!" });
  }

  db.query("SELECT * FROM `user` WHERE email = ?", [email], (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Error hashing password" });

      db.query(
        "INSERT INTO `user` SET ?",
        { email, password: hashedPassword, nama_lengkap },
        (err) => {
          if (err) return res.status(500).send(err);
          res.json({ message: "User admin berhasil dibuat" });
        }
      );
    });
  });
});

// LOGIN ADMIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM `user` WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(400).json({ message: "Email tidak ditemukan" });

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(401).json({ message: "Password salah" });

      const token = jwt.sign(
        { iduser: user.iduser, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        message: "Login berhasil",
        token,
        user: {
          iduser: user.iduser,
          email: user.email,
          nama_lengkap: user.nama_lengkap,
        }
      });
    });
  });
});

module.exports = router;
