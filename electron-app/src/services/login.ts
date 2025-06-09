export const loginService = async (user: string, password: string) => {
  try {
    console.log(user, password)
    const response = await fetch('https://tu-api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password }),
    });

    if (!response.ok) {
      throw new Error('Error en login');
    }

    const data = await response.json();
    console.log(data);
    
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
export default loginService