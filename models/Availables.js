const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const AvailablesSchema = new mongoose.Schema({
	test: { type: String },
});

const Available = mongoose.models.Available || mongoose.model("Available", AvailablesSchema);

module.exports = {
	Available,
};
