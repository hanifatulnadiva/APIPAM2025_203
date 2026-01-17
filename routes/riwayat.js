const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    const query = `
        SELECT 
            r.idriwayat, 
            r.tanggal_perawatan, 
            r.jenis_tindakan, 
            r.catatan, 
            r.idappointment,
            p.nama AS nama_pasien, 
            d.nama_dokter AS nama_dokter,
            a.keluhan AS keluhan
        FROM riwayat_perawatan r
        INNER JOIN appointment a ON r.idappointment = a.idappointment
        INNER JOIN pasien p ON a.idpasien = p.idpasien
        INNER JOIN dokter d ON a.iddokter = d.iddokter
        ORDER BY r.idriwayat DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("SQL Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Menambahkan GET Detail by ID untuk Halaman Detail di Android
router.get('/:id', (req, res) => {
    const query = `
        SELECT 
            r.*, p.nama AS nama_pasien, d.nama AS nama_dokter, a.keluhan
        FROM riwayat_perawatan r
        INNER JOIN appointment a ON r.idappointment = a.idappointment
        INNER JOIN pasien p ON a.idpasien = p.idpasien
        INNER JOIN dokter d ON a.iddokter = d.iddokter
        WHERE r.idriwayat = ?
    `;
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json(result[0]);
    });
});

router.post('/', (req, res) => {
    const { idappointment, tanggal_perawatan, jenis_tindakan, catatan } = req.body;
    
    const sql = "INSERT INTO riwayat_perawatan (idappointment, tanggal_perawatan, jenis_tindakan, catatan) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [idappointment, tanggal_perawatan, jenis_tindakan, catatan], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gagal simpan", error: err.message });
        }
        res.json({ message: "Riwayat berhasil ditambahkan" });
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