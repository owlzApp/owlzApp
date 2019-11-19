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

  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^(0|[1-9][0-9]{9})$/i.test(values.phone)) {
    errors.phone = "Invalid phone number, must be 10 digits";
  }

  if (!values.interest) {
    errors.interest = "Required";
  }

  if (!values.people) {
    errors.people = "Required";
  }

  if (!values.sex) {
    errors.sex = "Required";
  }
  return errors;
};

export default validate;
