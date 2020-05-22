/* eslint-disable @typescript-eslint/camelcase */
jest.mock('../../models/CourierModel');
jest.mock('express-validator');
import {
  getCouriers,
  getAvailableCouriersList,
  updateCourierData,
  removeCourier
} from '../CourierService';
import * as apiResponse from '../../helpers/apiResponse';
import CourierModel from '../../models/CourierModel';


describe('getCouriers', () => {
  it('should get couriers list', async () => {

    const statusMock = jest.fn(() => ({ json: jest.fn() }));
    const spy = jest.spyOn(apiResponse, 'successResponse');

    CourierModel.find.mockResolvedValue({ id: 1, capacity: 20 });
    await getCouriers({ status: statusMock });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  })

  it('should call an error response when error gets thrown', async () => {

    const statusMock = jest.fn(() => ({ json: jest.fn() }));
    const spy = jest.spyOn(apiResponse, 'errorResponse');

    CourierModel.find.mockImplementation(() => {
      throw new Error('Error');
    });
    await getCouriers({ status: statusMock });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  })
});

describe('getAvailableCouriersList', () => {
  it('should get available couriers list', async () => {

    const statusMock = jest.fn(() => ({ json: jest.fn() }));
    const spy = jest.spyOn(apiResponse, 'successResponse');

    CourierModel.find.mockResolvedValue({ id: 1, capacity: 20 });
    await getAvailableCouriersList({ body: { capacity_required: 20} }, { status: statusMock });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  })

  it('should call an error response when error gets thrown', async () => {

    const statusMock = jest.fn(() => ({ json: jest.fn() }));
    const spy = jest.spyOn(apiResponse, 'errorResponse');

    CourierModel.find.mockImplementation(() => {
      throw new Error('Error');
    });
    await getAvailableCouriersList({ body: { capacity_required: 20} },{ status: statusMock });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  })
});

describe('updateCourierData', () => {
  it('should update courier data', async () => {

    const req = { body: { max_capacity: 20, current_capacity: 15 }, params: { id: 1 } };
    const statusMock = jest.fn(() => ({ json: jest.fn() }));
    const spy = jest.spyOn(apiResponse, 'successResponse');

    CourierModel.findByIdAndUpdate.mockResolvedValue({ id: 1, currentCapacity: 15, maxCapacity: 20 });
    await updateCourierData(req, { status: statusMock });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  })

  it('should call an error response when error gets thrown', async () => {

    const statusMock = jest.fn(() => ({ json: jest.fn() }));
    const spy = jest.spyOn(apiResponse, 'errorResponse');

    CourierModel.findByIdAndUpdate.mockImplementation(() => {
      throw new Error('Error');
    });
    await updateCourierData({ body: { max_capacity: 20, current_capacity: 15 } },{ status: statusMock });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  })
});

describe('removeCourier', () => {
  it('should remove wanted courier', async () => {

    const req = { params: { id: 1 } };
    const statusMock = jest.fn(() => ({ json: jest.fn() }));
    const spy = jest.spyOn(apiResponse, 'successResponse');

    CourierModel.findByIdAndRemove.mockResolvedValue({ id: 1, currentCapacity: 15, maxCapacity: 20 });
    await removeCourier(req, { status: statusMock });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  })

  it('should call an error response when error gets thrown', async () => {

    const req = { params: { id: 1 } };
    const statusMock = jest.fn(() => ({ json: jest.fn() }));
    const spy = jest.spyOn(apiResponse, 'errorResponse');

    CourierModel.findByIdAndRemove.mockImplementation(() => {
      throw new Error('Error');
    });
    await removeCourier(req, { status: statusMock });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  })
});