const yup = require('yup')

const yupProductInput = yup.object().shape({
  name: yup.string().required('Required'),
  price: yup.number().typeError('Number Only').positive('Positive Number only').max(2147483647).required('Required'),
  type: yup.string().required('Required'),
  stock: yup.number().typeError('Number Only').integer().min(0, 'Positive Number Only').max(2147483647).required('Required'),
  enabled: yup.bool().required('Required'),
  url: yup.string().required('Required').matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, 'Only valid URL.')
})

const yupRegisterInput = yup.object().shape({
  login: yup.string().required('Required').max(30).matches(/^[a-zA-Z-_]+$/, 'Only letters !'),
  firstName: yup.string().required('Required').max(100).matches(/^[a-zA-Z-_]+$/, 'Only letters!'),
  lastName: yup.string().required('Required').max(100).matches(/^[a-zA-Z-_]+$/, 'Only letters!'),
  pwd: yup.string().required('Required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Min. 8 characters. It must contain at least one number and one letter.'),
  confPwd: yup.string().required('Required').oneOf([yup.ref('pwd')], 'Not Matching.')
})

exports.yupProductInput = yupProductInput
exports.yupRegisterInput = yupRegisterInput
