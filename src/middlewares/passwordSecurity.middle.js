export const passwordSecurity = (req, res, next) => {
  const { password } = req.body;
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const result = pattern.test(password);
  if (result) {
    next();
  } else {
    res.status(406).json({
      message:
        "Your password must have at least A-Z, a-z, 0-9 characters, one of the following special characters: @$!%*?& and 8 characters length",
    });
  }
};
