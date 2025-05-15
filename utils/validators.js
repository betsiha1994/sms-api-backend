function validateContact(data) {
  const errors = {};

  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Name is required and must be a string';
  }

  const phoneRegex = /^09\d{8}$/; // Ethiopian mobile number format
  if (!data.phoneNumber || !phoneRegex.test(data.phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
function validateRegister(data) {
  const errors = [];

  if (!data.username || data.username.trim() === '') {
    errors.push('Username is required');
  }

  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!data.confirmPassword) {
    errors.push('Confirm password is required');
  } else if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return errors;
}
function validateLogin(data) {
  const errors = [];

  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
}

function validateSMS(data) {
  const errors = {};

  // Phone number must be in Ethiopian format: 09xxxxxxxx
  const phoneRegex = /^09\d{8}$/;

  if (!data.phoneNumber || !phoneRegex.test(data.phoneNumber)) {
    errors.phoneNumber = 'Phone number must be in 09xxxxxxxx format';
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim() === '') {
    errors.message = 'Message is required and must be a non-empty string';
  }

  // Optional: Check max message length (e.g., 160 characters for SMS)
  if (data.message && data.message.length > 160) {
    errors.message = 'Message must not exceed 160 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = {
  validateSMS,
  validateContact,
  validateRegister,
  validateLogin
};
