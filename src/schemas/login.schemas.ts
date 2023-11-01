import * as Yup from 'yup'
export const siginSchema = Yup.object({
  employeeCode: Yup.string().required('trường dữ liệu email là bắt buộc').trim(),
  password: Yup.string().min(6).required('trường dữ liệu password ít nhất 6 kí tự').trim()
})
export type SigninForm = Yup.InferType<typeof siginSchema>
