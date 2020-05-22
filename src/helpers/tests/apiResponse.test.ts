import * as apiResponse from '../apiResponse';

describe('successResponse', () => {
  it('should form correct response code for success response', () => {

    const res = { status: jest.fn(() => ({ json: jest.fn() })) };
    apiResponse.successResponse(res, 'Success', { id: 1, capacity: 20 })
    
    expect(res.status).toHaveBeenCalledWith(200);
  })
})

describe('errorResponse', () => {
  it('should form correct response code for error response', () => {

    const res = { status: jest.fn(() => ({ json: jest.fn() })) };
    apiResponse.errorResponse(res, 'Error')
    
    expect(res.status).toHaveBeenCalledWith(500);
  })
})

describe('notFoundResponse', () => {
  it('should form correct response code for not found response', () => {

    const res = { status: jest.fn(() => ({ json: jest.fn() })) };
    apiResponse.notFoundResponse(res, '404')
    
    expect(res.status).toHaveBeenCalledWith(404);
  })
})

describe('validationErrorWithData', () => {
  it('should form correct response code for validation error response', () => {

    const res = { status: jest.fn(() => ({ json: jest.fn() })) };
    apiResponse.validationErrorWithData(res, 'Validation Error', { id: 1, capacity: 20 })
    
    expect(res.status).toHaveBeenCalledWith(400);
  })
})