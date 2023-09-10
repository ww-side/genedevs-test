export const isAuthTokenPresent = (): boolean => {
  const token = localStorage.getItem('jwtToken');
  return !!token;
};
