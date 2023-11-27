import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { LotteryDraw } from '@/models';

type FormErrors = {
  w_date?: string;
  folio?: string;
  letters?: string;
  prizes?: {
    first?: string;
    second?: string;
    third?: string;
  };
  serie?: string;
  number?: string;
  type?: string;
};
function App() {
  const dataTransform = (values: LotteryDraw): void => {
    values.letters = values.letters.toUpperCase();
    values.date = new Date(values.date).toISOString();
  };
  const initialValues: LotteryDraw = {
    date: new Date(),
    folio: 0,
    letters: '',
    prizes: {
      first: '',
      second: '',
      third: '',
    },
    serie: 0,
    number: 0,
    type: 'Dominical',
  };

  const validate = (values: LotteryDraw): FormErrors => {
    const errors: FormErrors = {};
    const drawTypes = ['Dominical', 'Intermedio', 'Zodiaco', 'Extraordinaria'];
    if (!drawTypes.includes(values.type)) {
      errors.type = `Must be a ${drawTypes.map((type) => ` ${type}`)}`;
    }
    if (values.number < 99 || values.number > 9999) {
      errors.number = 'Must be a number between 999 and 9999';
    }
    if (values.prizes) {
      if (!/^\d+$/.test(values.prizes.first)) {
        errors.prizes = {};
        errors.prizes.first = 'Must be a numbers';
      }
      if (!/^\d+$/.test(values.prizes.second)) {
        errors.prizes = {};
        errors.prizes.second = 'Must be a numbers';
      }
      if (!/^\d+$/.test(values.prizes.third)) {
        errors.prizes = {};
        errors.prizes.third = 'Must be a numbers';
      }
    }
    if (!/^[A-Za-z]+$/.test(values.letters)) {
      errors.letters = 'Must be a letterss';
    }
    if (values.letters.length !== 4) {
      errors.letters = 'Must be a 4 characters';
    }
    if (values.folio < 1 || values.folio > 99) {
      errors.folio = 'Must be less than 99';
    }
    if (values.serie < 1 || values.serie > 99) {
      errors.serie = 'Must be a number between 1 and 99';
    }
    return errors;
  };

  const handleSubmit = async (values: LotteryDraw, { setSubmitting, resetForm }: FormikHelpers<LotteryDraw>) => {
    dataTransform(values);
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error al enviar a la API:', error.message);
    }
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <section className='max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded divide-y-2 divide-gray-300'>
        <h1 className='text-2xl text-center font-bold pb-1'>Lottery</h1>
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor='date' className='label mt-4'>
                  Date:
                </label>
                <Field type='date' id='date' name='date' required className='input' />
                <ErrorMessage name='date' component='div' className='inputErrorMessage' />
              </div>

              <div className='flex gap-2'>
                <div className='w-1/2'>
                  <label htmlFor='type' className='label'>
                    Type:
                  </label>
                  <Field as='select' id='type' name='type' required className='input'>
                    <option value='Dominical'>Dominical</option>
                    <option value='Intermedio'>Intermedio</option>
                    <option value='Zodiaco'>Zodiaco</option>
                    <option value='Extraordinaria'>Extraordinaria</option>
                  </Field>
                  <ErrorMessage name='type' component='div' className='inputErrorMessage' />
                </div>
                <div className='w-1/2'>
                  <label htmlFor='number' className='label'>
                    Number:
                  </label>
                  <Field type='number' id='number' name='number' required placeholder='0' className='input' />
                  <ErrorMessage name='number' component='div' className='inputErrorMessage' />
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
                    className='input uppercase'
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
