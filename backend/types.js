const zod = require("zod");

const signupUserSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string().email(),
  password: zod.string(),
});

const signInUserSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

module.exports = { signupUserSchema, signInUserSchema };
