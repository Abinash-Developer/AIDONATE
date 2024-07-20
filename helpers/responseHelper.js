
const sendSuccessResponse = (res, data, message = 'Operation was successful') => {
    res.status(200).json({
        success: true,
        message: message,
        data: data
    });
};

const sendBadRequestResponse = (res, message = 'Bad request',status=400) => {
    res.status(status).json({
        status: false,
        message: message
    });
};

module.exports = {
    sendSuccessResponse,
    sendBadRequestResponse,
};
