export const inputValidation = (formData) => {
  let errors = [];
  if (!formData.username) {
    errors.push('username is required');
  }

  if (!formData.password) {
    errors.push('password is required');
  }
  return errors;
}