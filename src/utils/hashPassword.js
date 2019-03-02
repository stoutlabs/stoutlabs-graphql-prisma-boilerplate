import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 chars');
  }

  return bcrypt.hash(password, 7);
};

export { hashPassword as default };