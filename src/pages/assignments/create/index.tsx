import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createAssignment } from 'apiSdk/assignments';
import { Error } from 'components/error';
import { assignmentValidationSchema } from 'validationSchema/assignments';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { LessonInterface } from 'interfaces/lesson';
import { UserInterface } from 'interfaces/user';
import { getLessons } from 'apiSdk/lessons';
import { getUsers } from 'apiSdk/users';
import { AssignmentInterface } from 'interfaces/assignment';

function AssignmentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AssignmentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAssignment(values);
      resetForm();
      router.push('/assignments');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AssignmentInterface>({
    initialValues: {
      status: '',
      lesson_id: (router.query.lesson_id as string) ?? null,
      student_id: (router.query.student_id as string) ?? null,
    },
    validationSchema: assignmentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Assignment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<LessonInterface>
            formik={formik}
            name={'lesson_id'}
            label={'Select Lesson'}
            placeholder={'Select Lesson'}
            fetcher={getLessons}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'student_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'assignment',
    operation: AccessOperationEnum.CREATE,
  }),
)(AssignmentCreatePage);
