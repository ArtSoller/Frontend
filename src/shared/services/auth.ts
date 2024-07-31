export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('access_token');
    return !!token;
};

export const logout = (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
};