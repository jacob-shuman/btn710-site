export const authenticate = async (_password?: string) => {
  const password = _password ?? localStorage.getItem('btn710-password');

  return await fetch('/api/access', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
};
