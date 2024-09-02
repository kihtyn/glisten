const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 }
});

const Participation = mongoose.model('Participation', participationSchema);

module.exports = Participation;
