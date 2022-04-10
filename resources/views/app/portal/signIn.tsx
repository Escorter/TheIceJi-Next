import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { signIn } from 'next-auth/react'

const SignIn = ({ setIsSignIn, providers, csrfToken }) => {
  return (
    <>
      <div className='relative h-full p-8 ml-2 rounded-lg Card-white-20 Border-white-40'>
        <h3 className='font-semibold uppercase'>Signin</h3>
        <form
          className='flex flex-col pt-6 Form-white'
          method='post'
          action='/api/auth/callback/theiceji-login'
        >
          <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
          <input
            className='Border-white-40 rounded-md'
            type='email'
            name='email'
            placeholder='Email'
            required={true}
          />
          <input
            className='mt-2 Border-white-40 rounded-md'
            type='password'
            name='password'
            placeholder='Password'
            required={true}
          />
          <button
            className='mt-5 Btn-white-40 Anim AnimOpacity-60'
            type='submit'
          >
            Submit
          </button>
          <div className='my-3'>
            <input type='checkbox' className='mr-2 Form-white-checkbox' />
            <label className='flex'>
              <p className='-mt-px text-xs'>Remember me</p>
            </label>
          </div>
        </form>
        <div className='flex justify-center w-full my-8'>
          <div className=' w-12 h-px my-auto bg-white/30' />
          <p className='px-3 text-xs'>or Continue with</p>
          <div className=' w-12 h-px my-auto bg-white/30' />
        </div>
        <div className='flex justify-center'>
          <div className=' p-2 bg-blue-500 rounded-full cursor-pointer'>
            <FontAwesomeIcon
              icon={brands('facebook-f')}
              size='xs'
              className='w-4 h-4'
              onClick={() => signIn(providers.facebook.id)}
            />
          </div>
          <div className='p-2 ml-3 bg-red-500 rounded-full cursor-pointer'>
            <FontAwesomeIcon
              icon={brands('google')}
              size='xs'
              className='w-4 h-4'
              onClick={() => signIn(providers.google.id)}
            />
          </div>
          <div className='p-2 ml-3 rounded-full cursor-pointer bg-slate-800'>
            <FontAwesomeIcon
              icon={brands('github')}
              size='xs'
              className='w-4 h-4'
              onClick={() => signIn(providers.github.id)}
            />
          </div>
        </div>
      </div>
      <p
        className='mt-1 mr-1 text-xs text-right cursor-pointer Anim AnimOpacity-40'
        onClick={() => setIsSignIn(false)}
      >
        Not have an Account?
      </p>
    </>
  )
}

export default SignIn
