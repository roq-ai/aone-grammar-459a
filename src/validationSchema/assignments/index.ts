import * as yup from 'yup';

export const assignmentValidationSchema = yup.object().shape({
  status: yup.string().required(),
  lesson_id: yup.string().nullable(),
  student_id: yup.string().nullable(),
});
