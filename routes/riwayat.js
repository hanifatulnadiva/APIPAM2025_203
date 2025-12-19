const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query("SELECT * FROM riwayat_perawatan", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

router.post('/', (req, res) => {
    const data = req.body;
    db.query("INSERT INTO riwayat_perawatan SET ?", data, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Riwayat perawatan ditambahkan" });
    });
});

router.put('/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;
    db.query("UPDATE riwayat_perawatan SET ? WHERE idriwayat=?", [data, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Data riwayat perawatan diupdate" });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM riwayat_perawatan WHERE idriwayat=?", id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Riwayat perawatan dihapus" });
    });
});

module.exports = router;