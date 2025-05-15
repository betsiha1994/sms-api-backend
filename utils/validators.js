function validateContact(data) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string');
  }

  const phoneRegex = /^09\d{8}$/; 
  if (!data.phoneNumber || !phoneRegex.test(data.phoneNumber)) {
    errors.push('Invalid phone number format');
  }

  return {
    isValid: errors.length === 0,
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
  const errors = [];

  
  const phoneRegex = /^09\d{8}$/;

  if (!data.phoneNumber || !phoneRegex.test(data.phoneNumber)) {
    errors.push('Phone number must be in 09xxxxxxxx format');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim() === '') {
    errors.push('Message is required and must be a non-empty string');
  }

 
  if (data.message && data.message.length > 160) {
    errors.push('Message must not exceed 160 characters');
  }

  return {
    isValid:errors.length === 0,
    errors,
  };
}

module.exports = {
  validateSMS,
  validateContact,
  validateRegister,
  validateLogin
};
