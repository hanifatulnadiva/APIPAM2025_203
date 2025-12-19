const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query("SELECT * FROM appointment", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

router.post('/', (req, res) => {
    const data = req.body;
    db.query("INSERT INTO appointment SET ?", data, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "appointment ditambahkan" });
    });
});

router.put('/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;
    db.query("UPDATE appointment SET ? WHERE idappointment=?", [data, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Data appointment diupdate" });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM appointment WHERE idappointment=?", id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "appointment dihapus" });
    });
});

module.exports = router;