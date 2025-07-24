// src/middleware/validasi.js

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    const errorMessages = error.issues.map(err => err.message);
    
    return res.status(400).json({
      status: 'error',
      message: 'Input tidak valid',
      errors: errorMessages,
    });
  }
};