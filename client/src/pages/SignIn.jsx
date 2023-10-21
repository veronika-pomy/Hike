import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOG_IN } from '../utils/mutations';

import '../style/AppContainer.css';
import '../style/SignIn.css';

const SignIn = () => {

  const { register, 
        handleSubmit,
        formState: { errors } 
      } = useForm();

  const form = useRef();

  const [ login, { error } ] = useMutation(LOG_IN);

   // callback to get the values from input boxes, use mutation to auth and login, redirect authenticated user to Dashboard
  const onSubmit = async (userdata, e) => {
    e.preventDefault();

    try {
      const loginUserResponse = await login({
        variables: {
          email: userdata.email,
          password: userdata.password
        },
      });

      const token = loginUserResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    };
  };

  return (
    <>
      <section className='sign-in'>
        
        <div
          className='sign-in-container'
        >
          <form
            ref={form}
            onSubmit={handleSubmit(onSubmit)}
            className='sign-in-form'
          >
            <input 
              type="email" 
              placeholder="Email"
              name="email"
              className="sign-in-email"
              {...register("email",
                {
                  required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                }
              )}  
            />
            {/* ERROR VALIDATION */}
            {(
              <p
                className="sign-in-error"
              >
                {errors.email?.type === "required" && "This field is required."}
                {errors.email?.type === "pattern" && "Invalid email. Please try again."}
              </p>
            )}
            <input 
              type="password"
              placeholder="Password"
              name="password"
              className="sign-in-password"
              {...register("password",
                {
                  required: true,
                }
              )} 
            />
            {/* ERROR VALIDATION */}
            {(
              <p
                className="sign-in-error"
              >
                {errors.password?.type === "required" && "This field is required."}
              </p>
            )}
            <button
              className='btn btn--outline btn--medium'
              type="submit"
            >
              Log In
            </button>
          </form>
          {error && (
              <p
              className="sign-in-temp-login-msg"
              >
                Incorrect credentials. Please try again.
              </p>
            
          )}
        </div>
      </section>
    </>
  )
};

export default SignIn;
