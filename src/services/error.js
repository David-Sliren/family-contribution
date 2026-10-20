export const getServiceError = (error) =>
  error?.response?.data?.error || error?.response?.data?.message || error?.message;
