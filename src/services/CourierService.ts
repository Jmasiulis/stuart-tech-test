import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import CourierModel from '../models/CourierModel';
import * as apiResponse from '../helpers/apiResponse';

mongoose.set("useFindAndModify", false);

const SUCCESS_MESSAGE = 'Success';
const VALIDATION_ERROR = 'Validation Error';

interface CourierProps {
  id: number;
  maxCapacity: number;
  currentCapacity: number;
}

function getCourierDataResult(data: { _id: number; maxCapacity: number; currentCapacity: number; }): CourierProps {
	return {
		id: data._id,
		maxCapacity: data.maxCapacity,
		currentCapacity: data.currentCapacity
	}
}

export const getCouriers = async (res): Promise<JSON>  => {
		try {
      const couriers = await CourierModel.find({}, '_id maxCapacity currentCapacity');
			return apiResponse.successResponse(res, SUCCESS_MESSAGE, couriers);
		} catch (err) {
      console.log(err);
			return apiResponse.errorResponse(res, err);
		}
}

export const getAvailableCouriersList = async (req, res): Promise<JSON>  => {
  try {
    const couriers = await CourierModel.find(
      { currentCapacity: { $gte: req.body.capacity_required}},
      '_id maxCapacity currentCapacity'
      );

    return apiResponse.successResponse(res, SUCCESS_MESSAGE, couriers);
  } catch (err) {
    return apiResponse.errorResponse(res, err);
  }
}

export const createCourier = async (req, res): Promise<JSON> => {
  try {
    const errors = validationResult(req);
    const courier = new CourierModel(
      {
        maxCapacity: req.body.max_capacity,
        currentCapacity: req.body.max_capacity
      });

    if (!errors.isEmpty()) {
      return apiResponse.validationErrorWithData(res, VALIDATION_ERROR, errors.array());
    }

    await courier.save(function (err) {
      if (err) { return apiResponse.errorResponse(res, err); }
      return null;
    });

    return apiResponse.successResponse(res, SUCCESS_MESSAGE, getCourierDataResult(courier));
  } catch (err) {
    return apiResponse.errorResponse(res, err);
  }
}

export const updateCourierData = async (req, res): Promise<JSON>  => {
  try {
    const errors = validationResult(req);
    const courier = new CourierModel(
      {
        maxCapacity: req.body.max_capacity,
        currentCapacity: req.body.current_capacity,
        _id: req.params.id
      });

    console.log(errors);
    if (errors) {
      return apiResponse.validationErrorWithData(res, VALIDATION_ERROR, errors.array());
    }

    await CourierModel.findByIdAndUpdate(req.params.id, courier, {}, (err) => {
      if (err) { 
        return apiResponse.errorResponse(res, err); 
      }

      return null;
    });

    return apiResponse.successResponse(res, 'Courier update successful.', getCourierDataResult(courier));
  } catch (err) {
    return apiResponse.errorResponse(res, err);
  }
}

export const removeCourier = async (req, res): Promise<JSON>  => {
  try {
    await CourierModel.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return apiResponse.errorResponse(res, err);
      }

      return null;
    });

    return apiResponse.successResponse(res, 'Courier deleted successfully.');
  } catch (err) {
    return apiResponse.errorResponse(res, err);
  }
}