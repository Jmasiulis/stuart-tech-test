export const successResponse = (res, msg: string, data?): JSON => {
	const resData = {
		status: 1,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

export const errorResponse = (res, msg: string): JSON => {
	const data = {
		status: 0,
		message: msg,
	};
	return res.status(500).json(data);
};

export const notFoundResponse = (res, msg: string): JSON => {
	const data = {
		status: 0,
		message: msg,
	};
	return res.status(404).json(data);
};

export const validationErrorWithData = (res, msg: string, data): JSON => {
	const resData = {
		status: 0,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};