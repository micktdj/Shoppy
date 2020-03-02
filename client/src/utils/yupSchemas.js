import * as Yup from 'yup'

export const yupProductInput = Yup.object().shape({
  name: Yup.string().required('Required'),
  price: Yup.number().typeError('Number Only').positive('Positive Number only').max(2147483647).required('Required'),
  type: Yup.string().required('Required'),
  stock: Yup.number().typeError('Number Only').integer().min(0, 'Positive Number Only').max(2147483647).required('Required'),
  enabled: Yup.bool().required('Required'),
  url: Yup.string().required('Required').matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, 'Only valid URL.')
})

export const yupRegisterInput = Yup.object().shape({
  login: Yup.string().required('Required').max(30).matches(/^[a-zA-Z-_]+$/, 'Only letters !'),
  firstName: Yup.string().required('Required').max(100).matches(/^[a-zA-Z-_]+$/, 'Only letters!'),
  lastName: Yup.string().required('Required').max(100).matches(/^[a-zA-Z-_]+$/, 'Only letters!'),
  pwd: Yup.string().required('Required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Min. 8 characters. It must contain at least one number and one letter.'),
  confPwd: Yup.string().required('Required').oneOf([Yup.ref('pwd')], 'Not Matching.')
})
