const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    const sql = `
        SELECT 
            a.*, 
            p.nama AS nama_pasien, 
            p.no_hp AS no_hp_pasien,
            d.nama_dokter AS nama_dokter, 
            d.spesialis AS spesialis_dokter
        FROM appointment a
        JOIN pasien p ON a.idpasien = p.idpasien
        JOIN dokter d ON a.iddokter = d.iddokter
        ORDER BY a.tanggal DESC, a.jam ASC
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

router.put('/:id/status', (req, res) => {
    const id = req.params.id;
    const { status } = req.body; 
    
    db.query(
        "UPDATE appointment SET status = ? WHERE idappointment = ?",
        [status, id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: `Status diperbarui ke ${status}` });
        }
    );
});

router.post('/', (req, res) => {
    const data = req.body;
    db.query("INSERT INTO appointment SET ?", data, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "appointment ditambahkan" });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM appointment WHERE idappointment=?", id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "appointment dihapus" });
    });
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT 
            a.*, 
            p.nama AS nama_pasien, 
            p.no_hp AS no_hp_pasien,
            p.alamat AS alamat_pasien,
            d.nama_dokter AS nama_dokter, 
            d.spesialis AS spesialis_dokter
        FROM appointment a
        JOIN pasien p ON a.idpasien = p.idpasien
        JOIN dokter d ON a.iddokter = d.iddokter
        WHERE a.idappointment = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).json({ message: "Appointment tidak ditemukan" });
        res.json(result[0]);
    });
});

// Route untuk mengupdate data appointment secara lengkap
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { idpasien, iddokter, tanggal, jam, keluhan, status } = req.body;

    const sql = `
        UPDATE appointment 
        SET idpasien = ?, iddokter = ?, tanggal = ?, jam = ?, keluhan = ?, status = ? 
        WHERE idappointment = ?
    `;

    db.query(
        sql, 
        [idpasien, iddokter, tanggal, jam, keluhan, status, id], 
        (err, result) => {
            if (err) {
                console.error("Update Error:", err.message);
                return res.status(500).send(err);
            }
            res.json({ message: "Appointment berhasil diperbarui" });
        }
    );
});

module.exports = router;