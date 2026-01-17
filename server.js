const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pasienRoutes = require('./routes/pasien');
const dokterRoutes = require('./routes/dokter');
const userRoutes = require('./routes/user');
const appointmentRoutes = require('./routes/appointment');
const riwayatRoutes = require('./routes/riwayat');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/pasien', pasienRoutes);
app.use('/dokter', dokterRoutes);
app.use('/user', userRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/riwayat', riwayatRoutes);

app.listen(3000,'0.0.0.0', () => {
    console.log("Server berjalan di port 3000");
});
