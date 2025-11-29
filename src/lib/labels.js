
export const loginLabels = {
  username: {
    required: true,
    type: 'username'
  },
  password: {
    required: true,
    type: 'password'
  }
}

export const signupLabels = {
  username: {
    required: true,
    type: 'username'
  },
  name: {
    required: false,
    type: 'text'
  },
  password: {
    required: true,
    type: 'password'
  },
  confirmPassword: {
    required: true,
    type: 'confirmPassword'
  }
}

export const editProfileLabels = {
  name: {
    required: false,
    type: 'text'
  },
  username: {
    required: true,
    type: 'username'
  },
  password: {
    required: false,
    type: 'password'
  },
  confirmPassword: {
    required: false,
    type: 'confirmPassword'
  }
}