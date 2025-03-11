
export const validateEmail = (email) => {
    let error = '';

    const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;

    if (email && !emailRegex.test(email)) {
        error = 'Почта введена не правильно.';
    }
    return error;
};


export const validatePassword = (password) => {
    let error = '';

    if (password.length > 0 && password.length !== 8) {
        error = 'Пароль должен состоять из 8 символов.';
    }
    return error;
};

