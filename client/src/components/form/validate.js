const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone || values.phone === "+" || values.phone === "+1") {
    errors.phone = "Required";
  }

  if (!values.interest) {
    errors.interest = "Required";
  }

  if (!values.message) {
    errors.message = "Required";
  }
  if (!values.date) {
    errors.date = "Required select one date";
  }

  if (!values.dateEnd) {
    errors.dateEnd = "Required select one date";
  }

  if (!values.time) {
    errors.time = "Required select one hour";
  }
  if (!values.timeCall) {
    errors.timeCall = "Select one hour to be call";
  }

  if (!values.dateCall) {
    errors.dateCall = "Select one date to be call";
  }

  if (!values.city) {
    errors.city = "Required";
  }
  if (!values.gender) {
    errors.gender = "Required";
  }
  return errors;
};

export default validate;
