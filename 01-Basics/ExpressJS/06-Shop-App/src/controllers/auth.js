const bcrypt = require("bcryptjs"),
  crypto = require("crypto"),
  { validationResult } = require("express-validator"),
  User = require("../models/users"),
  { sendEmail, getOAuth2AccessToken } = require("../utility/mail"),
  {
    renderParamsCommon,
    renderParamsLogin,
    renderParamsSignUp,
    renderParamsResetPassword,
  } = require("../constants/renderParams");

const SERVER_PORT = process.env["SERVER_PORT"];
const SERVER_IP = process.env["SERVER_IP"];
const salt = bcrypt.genSaltSync(10);

const getLogin = (req, res, next) => {
  res.render("auth/login", {
    ...renderParamsLogin,
    ...renderParamsCommon,
  });
};

const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    console.error("VAL", validationErrors.array());
    return res
      .status(422) // validation error
      .render("auth/login", {
        ...renderParamsLogin,
        ...renderParamsCommon,
        validationErrors: validationErrors.array(),
        oldInputs: {
          email: email,
          password: password,
        },
      });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("errorMessage", "No user found! Please try again.");
        return res.render("auth/login", {
          ...renderParamsLogin,
          ...renderParamsCommon,
          errorMessage: ["No user found! Please try again."],
          oldInputs: {
            email: email,
            password: password,
          },
        });
      }

      return bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.user = user;
            req.session.isAuthenticated = true;

            return req.session.save((error) => {
              if (error) {
                res.render("auth/login", {
                  ...renderParamsLogin,
                  ...renderParamsCommon,
                  errorMessage: ["Server error! Please try again."],
                  oldInputs: {
                    email: email,
                    password: password,
                  },
                });
                console.error(error);
              } else {
                res.redirect("/");
              }
            });
          } else {
            res.render("auth/login", {
              ...renderParamsLogin,
              ...renderParamsCommon,
              errorMessage: ["Credentials are not valid! Please try again."],
              oldInputs: {
                email: email,
                password: password,
              },
            });
          }
        })
        .catch((error) => {
          res.render("auth/login", {
            ...renderParamsLogin,
            ...renderParamsCommon,
            errorMessage: ["Something went wrong! Please try again."],
            oldInputs: {
              email: email,
              password: password,
            },
          });
          console.error(error);
        });
    })
    .catch((error) => {
      res.render("auth/login", {
        ...renderParamsLogin,
        ...renderParamsCommon,
        errorMessage: ["Something went wrong! Please try again."],
        oldInputs: {
          email: email,
          password: password,
        },
      });
      console.error(error);
    });
};

const getSignUp = (req, res, next) => {
  res.render("auth/sign-up", {
    ...renderParamsSignUp,
    ...renderParamsCommon,
  });
};

const postSignUp = (req, res, next) => {
  const { email, password, passwordConfirm } = req.body;
  const validationErrors = validationResult(req);
  let newUser;

  if (!validationErrors.isEmpty()) {
    return res
      .status(422) // validation error
      .render("auth/sign-up", {
        ...renderParamsSignUp,
        ...renderParamsCommon,
        validationErrors: validationErrors.array(),
        oldInputs: {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        },
      });
  }

  bcrypt
    .hash(password, salt)
    .then((passHashed) => {
      newUser = new User({
        email: email,
        password: passHashed,
        cart: { items: [] },
      });

      return getOAuth2AccessToken;
    })
    .then((accessToken) => {
      return sendEmail(
        email,
        "Sign up confirmation",
        `<h1>Congratulations!</h1><p>You have successfully created your account via <strong>${email}</strong>.</p>`,
        accessToken
      );
    })
    .then((result) => {
      return newUser.save();
    })
    .then((result) => {
      res.render("auth/login", {
        ...renderParamsLogin,
        ...renderParamsCommon,
        successMessage: ["Congratulations! You have successfully signed up."],
      });
    })
    .catch((error) => {
      res.render("auth/sign-up", {
        ...renderParamsSignUp,
        ...renderParamsCommon,
        errorMessage: ["Something went wrong! Please try again."],
        oldInputs: {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        },
      });
      console.error(error);
    });
};

const postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
    }
    res.render("auth/login", {
      ...renderParamsLogin,
      ...renderParamsCommon,
    });
  });
};

const getResetPassword = (req, res, next) => {
  res.render("auth/reset-password", {
    ...renderParamsResetPassword,
    ...renderParamsCommon,
    errorMessage: req.flash("errorMessage"),
  });
};

const postResetPassword = (req, res, next) => {
  const { email } = req.body;

  crypto.randomBytes(32, (error, buffer) => {
    if (error) {
      req.flash("errorMessage", "Something went wrong! Please try again!");
      console.error(error);
      return res.redirect("/auth/reset-password");
    } else {
      const resetToken = buffer.toString("hex");

      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            req.flash(
              "errorMessage",
              "Credentials are not valid! Please try again."
            );
            return res.redirect("/auth/reset-password");
          } else {
            user.resetToken = resetToken;
            user.resetTokenExpirationDate = Date.now() + 60 * 60 * 1000;

            return user
              .save()
              .then((result) => {
                return getOAuth2AccessToken();
              })
              .then((accessToken) => {
                const emailHtml = `
            <p>You requested a password reset.</p>
            <p>
              Please click this
              <a href="http://${SERVER_IP}:${SERVER_PORT}/auth/set-new-password/${resetToken}"> link </a>
              to set a new password.
            </p>
            <p>
              This link will be expired in one hour.
            </p>
          `;

                return sendEmail(
                  email,
                  "Reset Password Request",
                  emailHtml,
                  accessToken
                );
              })
              .then((result) => {
                res.redirect("/");
              })
              .catch((error) => {
                console.error(error);
                req.flash(
                  "errorMessage",
                  "Something went wrong! Please try again."
                );
                res.redirect("/auth/reset-password");
              });
          }
        })
        .catch((error) => {
          console.error(error);
          req.flash("errorMessage", "Something went wrong! Please try again.");
          res.redirect("/auth/reset-password");
        });
    }
  });
};

const getSetNewPassword = (req, res, next) => {
  const { token } = req.params;

  User.findOne({
    resetToken: token,
    resetTokenExpirationDate: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        req.flash("errorMessage", "Something went wrong! Please try again!");
        res.redirect("/auth/reset-password");
      } else {
        res.render("auth/set-new-password", {
          pageTitle: "Set New Password",
          path: "/auth/set-new-password",
          userId: user._id.toString(),
          token: token,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      req.flash("errorMessage", "Something went wrong! Please try again.");
      res.redirect("/auth/login");
    });
};

const postSetNewPassword = (req, res, next) => {
  const { userId, token, password, passwordConfirm } = req.body;
  let userUpdate;

  if (password !== passwordConfirm) {
    req.flash("errorMessage", "Passwords are not identical!");
    return res.redirect(`/auth/set-new-password/${token}`);
  }

  User.findOne({
    _id: userId,
    resetToken: token,
    resetTokenExpirationDate: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        req.flash("errorMessage", "Something went wrong! Please try again!");
        res.redirect("/auth/reset-password");
      } else {
        userUpdate = user;
        return bcrypt.hash(password, salt);
      }
    })
    .then((passHashed) => {
      userUpdate.password = passHashed;
      userUpdate.resetToken = undefined;
      userUpdate.resetTokenExpirationDate = undefined;

      return userUpdate.save();
    })
    .then((result) => {
      return getOAuth2AccessToken;
    })
    .then((accessToken) => {
      return sendEmail(
        userUpdate.email,
        "Password Updated",
        `<p>You have successfully updated your password.</p>`,
        accessToken
      );
    })
    .then((result) => {
      req.flash(
        "successMessage",
        "Congratulations! You have successfully updated your password."
      );
      res.redirect("/auth/login");
    })
    .catch((error) => {
      req.flash("errorMessage", "Something went wrong! Please try again.");
      res.redirect("/auth/reset-password");
      console.error(error);
    });
};

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignUp,
  postSignUp,
  getResetPassword,
  postResetPassword,
  getSetNewPassword,
  postSetNewPassword,
};
