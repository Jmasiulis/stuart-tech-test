import { Schema, model } from 'mongoose';

const CourierSchema = new Schema({
	maxCapacity: {type: Number, required: true},
	currentCapacity: {type: Number, required: true},
}, {timestamps: true});

export default model('Courier', CourierSchema);