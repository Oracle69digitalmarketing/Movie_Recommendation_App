export const handleError = (res, error, message = 'Something went wrong', code = 500) => {
  console.error(error);
  res.status(code).json({ message, error: error.message });
};
