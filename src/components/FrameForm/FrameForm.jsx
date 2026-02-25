import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addFrame } from '../../redux/frames/framesSlice';
import { selectSections } from '../../redux/sections/sectionsSlice';
import css from './FrameForm.module.css';

const validationSchema = Yup.object({
  title: Yup.string().min(3, 'Заголовок має бути не менше 3 символів').required('Обов’язкове поле'),
  info: Yup.string().required('Обов’язкове поле'),
  sectionId: Yup.string().nullable(),
});

const FrameForm = () => {
  const dispatch = useDispatch();
  const sections = useSelector(selectSections);

  return (
    <Formik
      initialValues={{ title: '', info: '', sectionId: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(addFrame({
          title: values.title,
          info: values.info,
          sectionId: values.sectionId || null,
        }));
        resetForm();
      }}
    >
      <Form className={css.form}>
        <label>
          Заголовок
          <Field name="title" className={css.input} />
          <ErrorMessage name="title" component="div" className={css.error} />
        </label>
        <label>
          Інформація
          <Field as="textarea" name="info" className={css.textarea} rows="4" />
          <ErrorMessage name="info" component="div" className={css.error} />
        </label>
        <label>
          Розділ
          <Field as="select" name="sectionId" className={css.select}>
            <option value="">Без розділу</option>
            {sections.map(section => (
              <option key={section.id} value={section.id}>
                {section.image} {section.title}
              </option>
            ))}
          </Field>
        </label>
        <button type="submit" className={css.btn}>Додати фрейм</button>
      </Form>
    </Formik>
  );
};

export default FrameForm;