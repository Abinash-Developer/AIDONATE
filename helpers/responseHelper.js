const sendSuccessResponse = (
  res,
  data,
  message = "Operation was successful"
) => {
  res.status(200).json({
    success: true,
    message: message,
    data: data,
  });
};

const sendBadRequestResponse = (res, message = "Bad request", status = 400) => {
  res.status(status).json({
    status: false,
    message: message,
  });
};

const handleMongoError = (error, res) => {
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Email or phone number already exist'
    });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error: ' + error.message
    });
  } else {
    console.error('MongoDB Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.'
    });
  }
};

const sendErrorResponse = (res, error, message) => {
  res.status(500).json({
      success: false,
      message: message || 'An error occurred',
      error: error.message || error
  });
};


module.exports = {
  sendSuccessResponse,
  sendBadRequestResponse,
  handleMongoError,
  sendErrorResponse
};
