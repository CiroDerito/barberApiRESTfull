const validateRegister = (input) => {
    const errors = {};

    if (!input.name.trim()) {
        errors.name = "Fill in the field with your name";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email.trim()) {
        errors.email = "Fill in the field with your Email ";
    } else if (!emailRegex.test(input.email)) {
        errors.email = "Invalid Email Format e.g. aa@mail.com";
    }

    const currentDate = new Date();
    const birthdate = new Date(input.birthdate);
    if (!input.birthdate) {
        errors.birthdate = "The Birthdate field is required";
    } else if (birthdate >= currentDate) {
        errors.birthdate = "Birthday cannot be equal to the current date";
    }

    const dniRegex = /^\d{7,8}$/;
    if (!input.nDni) {
        errors.nDni = "DNI is required";
    } else if (!dniRegex.test(input.nDni)) {
        errors.nDni = "DNI cannot have less than 7 numbers, nor more than 8 numbers";
    }

    const usernameRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!input.username.trim()) {
        errors.username = "Fill in the field with your username";
    } else if (!usernameRegex.test(input.username)) {
        errors.username = "The username must be at least 8 characters long and contain at least one capital letter.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,14}$/;
    if (!input.password) {
        errors.password = "Fill in the field with your password";
    } else if (!passwordRegex.test(input.password)) {
        errors.password = "The password must be between 6 and 14 characters, with at least one capital letter and one special character.";
    }

    if (input.password !== input.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};

export default validateRegister;
