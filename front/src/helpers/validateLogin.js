const validateLogin = (loginData) => {
    const errors = {};

    if (!loginData.username) {
        errors.username = "The username field is required.";
    }

    if (!loginData.password) {
        errors.password = "The password field is required.";
    }

    return errors;
};

export default validateLogin;
