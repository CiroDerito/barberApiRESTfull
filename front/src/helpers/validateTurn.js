const validateTurn = (values) => {
    const errors = {};

    if (!values.date) {
        errors.date = 'Indicate a date';
    } else {
        const today = new Date();
        const selectedDate = new Date(values.date);

        if (selectedDate < today.setHours(0, 0, 0, 0)) {
            errors.date = 'The date cannot be before the current date';
        }
    }


    if (!values.time) {
        errors.time = 'Indicate a schedule';
    } else {
        const [hour, minute] = values.time.split(':');
        const time = parseInt(hour, 10) * 60 + parseInt(minute, 10);
        const openingTime = 8 * 60;
        const closingTime = 18 * 60;

        if (time < openingTime || time > closingTime) {
            errors.time = 'Opening hours: 08:00 to 18:00';
        }
    }


    if (!values.description) {
        errors.description = 'Please indicate the reason for the shift';
    }

    return errors;
};

export default validateTurn;
