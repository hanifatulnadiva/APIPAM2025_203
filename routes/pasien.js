const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.get('/', (req, res) => {
    db.query("SELECT * FROM pasien", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});


router.post('/', (req, res) => {
    const data = req.body;
    db.query("INSERT INTO pasien SET ?", data, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Pasien ditambahkan" });
    });
});

router.put('/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;
    db.query("UPDATE pasien SET ? WHERE idpasien=?", [data, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Data pasien diupdate" });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM pasien WHERE idpasien=?", id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Pasien dihapus" });
    });
});

module.exports = router;
