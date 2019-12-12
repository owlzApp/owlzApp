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

  if (!values.interest || values.interest.length === 0) {
    errors.interest = "Required";
  }

  if (!values.peopleMale && !values.peopleFemale) {
    errors.peopleMale = "Required";
  }

  if (!values.peopleFemale && !values.peopleMale) {
    errors.peopleFemale = "Required";
  }

  if (values.peopleFemale <= 0 && values.peopleMale <= 0) {
    errors.peopleFemale = "Required";
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
  return errors;
};

export default validate;
