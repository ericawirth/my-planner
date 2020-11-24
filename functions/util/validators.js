exports.validateLoginData = (data) => {
	let errors = {};
	if (isEmpty(data.email)) errors.email = 'Must not be empty';
	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

const isEmail = (email) => {
	const emailRegEx = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
	if (email.match(emailRegEx))
		return true;
	else return false;
};

exports.validateSignUpData = (data) => {
	let errors = {};
	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be valid email address';
	}
	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

const isEmpty = (string) => {
	if (string.trim() === '') return true;
	else return false;
};