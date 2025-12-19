const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query("SELECT * FROM dokter", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

router.post('/', (req, res) => {
    const data = req.body;
    db.query("INSERT INTO dokter SET ?", data, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Dokter ditambahkan" });
    });
});

router.put('/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;
    db.query("UPDATE dokter SET ? WHERE iddokter=?", [data, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Data dokter diupdate" });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM dokter WHERE iddokter=?", id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Dokter dihapus" });
    });
});

module.exports = router;