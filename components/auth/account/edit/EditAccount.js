import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { FormStyles } from '../../signup/SignupStyles';
import useUser from '../../User';
import { EditAccountStyles } from './EditAccountStyles';

export default function EditAccount() {
  const me = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      dirtyFields,
      isDirty,
    },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: me?.username || '',
      company: '',
      email: me?.email || '',
      phone: '4444444444',
      orderNotes: '',
    },
  });

  const { data: session } = useSession();

  const onSubmitForm = async values => {
    try {
      const { data } = await registerUser({
        variables: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      });

      if (data?.register?.user) {
        toast.success(
          `You are signed up with ${data?.register?.user?.email}`,
          {
            position: 'top-right',
            autoClose: 8000,
          }
        );

        reset();
      }
    } catch (err) {
      toast.error(`${err?.message}`, {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  return (
    <EditAccountStyles>
      <FormStyles
        isDirty={isDirty}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <fieldset>
          <input
            type='text'
            name='name'
            placeholder='Full name'
            className={
              dirtyFields.name ? 'input-dirty' : ''
            }
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Seems to short',
              },
            })}
          />
          {
            <div className='input-error'>
              {errors?.name?.message}
            </div>
          }
        </fieldset>

        <fieldset>
          <input
            type='text'
            name='company'
            placeholder='Company name'
            className={
              dirtyFields.company ? 'input-dirty' : ''
            }
            {...register('company')}
          />
          {
            <div className='input-error'>
              {errors?.company?.message}
            </div>
          }
        </fieldset>

        <fieldset>
          <input
            type='email'
            placeholder='Email'
            className={
              dirtyFields.email ? 'input-dirty' : ''
            }
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email',
              },
            })}
          />
          {
            <span className='input-error'>
              {errors?.email?.message}
            </span>
          }
        </fieldset>

        <fieldset>
          <input
            type='text'
            name='phone'
            placeholder='Phone #'
            className={
              dirtyFields.phone ? 'input-dirty' : ''
            }
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim,
                message:
                  'Please enter a valid phone number',
              },
              minLength: {
                value: 10,
                message: 'Seems to short',
              },
              maxLength: {
                value: 12,
                message: 'Not a phone number',
              },
            })}
          />
          {
            <div className='input-error'>
              {errors?.phone?.message}
            </div>
          }
        </fieldset>
        <fieldset className='input-field'>
          <textarea
            name='message'
            placeholder='Leave us some notes about your order'
            className={
              dirtyFields.orderNotes ? 'input-dirty' : ''
            }
            rows={3}
            {...register('orderNotes', {
              minLength: {
                value: 10,
                message: 'Tell us more please',
              },
            })}
          />
          {
            <span className='input-error'>
              {errors?.orderNotes?.message}
            </span>
          }
        </fieldset>

        <p className='price-not-available-note'>
          The charge may include additional cost of items
          which price not available at the moment of order.
          We will notify you about total cost after
          reviewing your order
        </p>

        {/* <button
          type='submit'
          disabled={isSubmitting || loading}
        >
          {isSubmitting || loading ? (
            <div>
              <Oval
                type='Oval'
                color='#b5dff0'
                height={20}
                width={20}
              />
            </div>
          ) : (
            <div>confirm order</div>
          )}
        </button> */}
      </FormStyles>
    </EditAccountStyles>
  );
}