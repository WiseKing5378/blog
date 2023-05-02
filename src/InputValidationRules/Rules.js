const inputRules = {
  usernameRules: {
    required: 'Required to fill in',
    minLength: {
      value: 3,
      message: 'Minimum of 3 characters',
    },
    maxLength: { value: 20, message: 'Maximum of 20 characters' },
  },
  passwordRules: {
    required: 'Required to fill in',
    minLength: {
      value: 6,
      message: 'Minimum of 6 characters',
    },
    maxLength: { value: 40, message: 'Maximum of 40 characters' },
  },
  emailRules: {
    required: 'Required to fill in',
    pattern: {
      value:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
      message: 'Email format like be email@em.em',
    },
  },
  urlRules: {
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: 'Enter correct url',
    },
  },
  requiredRules: {
    required: 'Required to fill in',
  },
};

export default inputRules;
