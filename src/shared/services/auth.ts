export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('access_token');
    // Можно добавить дополнительную логику для проверки срока действия токена
    return !!token;
};

export const logout = (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id'); // если нужно удалить другие данные
};