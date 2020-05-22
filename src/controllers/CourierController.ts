import { body } from 'express-validator';
import { validateNumberData } from '../helpers/apiValueValidator';

import {
	getCouriers,
	getAvailableCouriersList,
	createCourier,
	removeCourier,
	updateCourierData
} from '../services/CourierService';

export const getCourierList = [
	(_req, res): Promise<JSON> => {
		return getCouriers(res);
	}
];

export const getAvailableCouriers = [
	body('capacity_required', 'Capacity required has invalid value.').custom((value) => {
    return validateNumberData(value, 'Capacity required');
	}),
 	(req, res): Promise<JSON> => {
		return getAvailableCouriersList(req, res);
	}
];

export const insertCourier = [
	body('max_capacity', 'Max capacity has invalid value.').custom((value) => {
    return validateNumberData(value, 'Max Capacity');
	}),
	(req, res): Promise<JSON> => {
		return createCourier(req,res);
	}
];

export const updateCourier = [
	body('max_capacity', 'Max capacity has invalid value.').custom((value) => {
    return validateNumberData(value, 'Max Capacity');
  }),
  body('current_capacity', 'Current capacity has invalid value.').custom((value) => {
    return validateNumberData(value, 'Current Capacity');
	}),
	(req, res): Promise<JSON> => {
		return updateCourierData(req,res);
	}
];

export const deleteCourier = [
	(req, res): Promise<JSON> => {
		return removeCourier(req, res);
	}
];
