import * as yup from 'yup'

export const validationSchemaForLogin = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Use the mail associated with your account'),
  pass: yup.string().required('Enter your password'),
})

export const SignUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Please, add your email address'),
  pass: yup
    .string()
    .required('Enter your password')
    .min(6, 'Password must be atleast 6 characters'),
  confPass: yup
    .string()
    .oneOf([yup.ref('pass'), undefined], 'Passwords must match!'),
  name: yup.string().min(3, 'Too Small').required('Please, add your full name'),
})
