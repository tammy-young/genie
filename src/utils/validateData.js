
export default function validateData(form, labels) {
  const errors = {};

  for (const field in labels) {
    const rules = labels[field];
    const value = form[field] ? form[field].trim() : '';

    if (rules.required && !value) {
      errors[field] = 'This field is required.';
      continue;
    }

    if (rules.type === 'username' && value) {
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(value)) {
        errors[field] = 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores.';
      }
    }

    if (rules.type === 'password' && value) {
      if (value.length < 6) {
        errors[field] = 'Password must be at least 6 characters long.';
      }
    }

    if (rules.type === 'confirmPassword' && value) {
      if (value !== form['password']) {
        errors[field] = 'Passwords do not match.';
      }
    }
  }

  return errors;
}
