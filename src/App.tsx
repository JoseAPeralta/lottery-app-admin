import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikValues } from 'formik';
import { LotteryDraw } from '@/models';

function App() {
  const getCurrentDate = (): Date => new Date();
  const initialValues: LotteryDraw = {
    draw_date: getCurrentDate(),
    folio: 0,
    letters: '',
    prizes: {
      first: '',
      second: '',
      third: '',
    },
    serie: 0,
    draw_number: 0,
    type: 'Dominical',
  };
  const validate = (values: LotteryDraw) => {
    const errors = {
      folio: '',
      letters: '',
      prizes: {
        first: '',
        second: '',
        third: '',
      },
      serie: '',
      draw_number: '',
      type: 'Dominical',
    };
    if (values.draw_number > 9999) {
      errors.draw_number = 'Must be less than 9999';
    }
    if (!/^\d+$/.test(values.prizes.first)) {
      errors.prizes.first = 'Must be a numbers';
    }
    if (!/^\d+$/.test(values.prizes.second)) {
      errors.prizes.second = 'Must be a numbers';
    }
    if (!/^\d+$/.test(values.prizes.third)) {
      errors.prizes.third = 'Must be a numbers';
    }
    if (!/^[A-Za-z]+$/.test(values.letters)) {
      errors.letters = 'Must be a letterss';
    }
    if (values.folio > 99) {
      errors.folio = 'Must be less than 99';
    }
    if (values.serie > 99) {
      errors.serie = 'Must be less than 99';
    }
    values.draw_date = new Date(values.draw_date).toISOString();
    console.log(values);
    return errors;
  };
  const onSubmit = async (values: LotteryDraw, { setSubmitting }) => {
    console.log('si entro');
    try {
      const apiUrl = 'https://us-east-1.aws.data.mongodb-api.com/app/data-llcjw/endpoint/lotteryDraws';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();

      console.log('Respuesta de la API:', responseData);

      // Puedes realizar acciones adicionales según la respuesta de la API
    } catch (error: any) {
      console.error('Error al enviar a la API:', error.message);
    }

    // Restablecer el formulario o realizar otras acciones si es necesario
    setSubmitting(false);
  };

  return (
    <>
      <section className='max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded divide-y-2 divide-gray-300'>
        <h1 className='text-2xl text-center font-bold pb-1'>Lottery</h1>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
          // onSubmit={(values, { setSubmitting }) => {
          //   console.log('hasol');
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     setSubmitting(false);
          //   }, 400);
          // }}
        >
          {({ isSubmitting }) => (
            <Form className='d-flex'>
              <div>
                <label htmlFor='draw_date' className='label mt-4'>
                  Date:
                </label>
                <Field type='date' id='draw_date' name='draw_date' required className='input' />
                <ErrorMessage name='draw_date' component='div' className='inputErrorMessage' />
              </div>

              <div className='flex gap-2'>
                <div className='w-1/2'>
                  <label htmlFor='drawType' className='label'>
                    Type:
                  </label>
                  <Field as='select' id='drawType' name='drawType' required className='input'>
                    <option value='Dominical'>Dominical</option>
                    <option value='Intermedio'>Intermedio</option>
                    <option value='Zodiaco'>Zodiaco</option>
                    <option value='Extraordinaria'>Extraordinaria</option>
                  </Field>
                </div>
                <div className='w-1/2'>
                  <label htmlFor='draw_number' className='label'>
                    Number:
                  </label>
                  <Field type='number' id='draw_number' name='draw_number' required placeholder='0' className='input' />
                  <ErrorMessage name='draw_number' component='div' className='inputErrorMessage' />
                </div>
              </div>

              <div>
                <p className='pb-4 pt-4'>Prizes:</p>
                <div className='pl-5'>
                  <div>
                    <label htmlFor='prizes.first' className='label'>
                      First:
                    </label>
                    <Field
                      type='text'
                      name='prizes.first'
                      required
                      id='prizes.first'
                      maxLength={4}
                      placeholder='0'
                      className='input'
                    />
                    <ErrorMessage name='prizes.first' component='div' className='inputErrorMessage' />
                  </div>
                  <label htmlFor='prizes.second' className='label'>
                    Second:
                  </label>
                  <Field
                    type='text'
                    id='prizes.second'
                    name='prizes.second'
                    required
                    maxLength={4}
                    placeholder='0'
                    className='input'
                  />
                  <ErrorMessage name='prizes.second' component='div' className='inputErrorMessage' />

                  <label htmlFor='prizes.third' className='label'>
                    Third:
                  </label>
                  <Field
                    type='text'
                    id='prizes.third'
                    name='prizes.third'
                    required
                    maxLength={4}
                    placeholder='0'
                    className='input'
                  />
                  <ErrorMessage name='prizes.third' component='div' className='inputErrorMessage' />
                </div>
              </div>

              <div className='flex gap-2 pt-4'>
                <div className='w-1/3'>
                  <label htmlFor='letters' className='label'>
                    Letters:
                  </label>
                  <Field
                    type='text'
                    id='letters'
                    name='letters'
                    required
                    maxLength={4}
                    placeholder='AAAA'
                    className='input'
                  />
                  <ErrorMessage name='letters' component='div' className='inputErrorMessage' />
                </div>
                <div className='w-1/3'>
                  <label htmlFor='folio' className='label'>
                    folio:
                  </label>
                  <Field
                    type='number'
                    id='folio'
                    name='folio'
                    required
                    maxLength={3}
                    placeholder='0'
                    className='input'
                  />
                  <ErrorMessage name='folio' component='div' className='inputErrorMessage' />
                </div>
                <div className='w-1/3'>
                  <label htmlFor='serie' className='label'>
                    serie:
                  </label>
                  <Field
                    type='number'
                    id='serie'
                    name='serie'
                    required
                    maxLength={3}
                    placeholder='0'
                    className='input'
                  />
                  <ErrorMessage name='serie' component='div' className='inputErrorMessage' />
                </div>
              </div>

              <button type='submit' disabled={isSubmitting} className='btn w-full '>
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
}

export default App;
