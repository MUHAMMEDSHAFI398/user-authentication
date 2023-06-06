const validate = (values) => {

    const errors = {};

    if (values.name === "") {
        errors.name = "Name number is required"
    } else if (!isNaN(values.name)) {
        errors.name = "Invalid entry"
    }

    if (values.email === "") {
        errors.email = "Email is required"
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        errors.email = "Invalid email"
    }

    if (values.password === "") {
        errors.password = "password is required"
    } else if (! /^(?=.*[0-9])[a-zA-Z0-9]{6,}$/.test(values.password)) {
        errors.password = "Include one number"
    }

    if (values.city === "") {
        errors.city = "city is required"
    }


   

    return errors;
};

export default validate;