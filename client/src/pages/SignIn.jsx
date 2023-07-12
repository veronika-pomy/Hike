import React from 'react';
import '../style/AppContainer.css';
import '../style/SignIn.css';

// TODO: Add authentication
// TODO: When user is signed up, redirect to the Dashboard page
// TODO: setset password functionality + email js

import { useRef } from 'react';
import { useForm } from "react-hook-form";

// temp condition to display success login message - for demonstration only
let logInSuccess = false;

const SignIn = () => {

  const { register, 
        handleSubmit, 
        trigger,
        reset, 
        watch,
        formState: { errors } 
      } = useForm();

  const form = useRef();

   // callback to get the values from input boxes and reset values of the input fields
  const onSubmit = (userdata) => {
    logInSuccess = true;
    console.log(userdata);
    reset();
  };

  return (
    <section className='sign-in'>
      
      <div
        className='sign-in-container'
      >
        {/* FORM HEADER */}
        {/* <p
          className='sign-in-header'
        >
          Sign In
        </p> */}
        {/* FORM */}
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
        {logInSuccess && (
            <p
             className="sign-in-temp-login-msg"
            >
              You are now logged in.
            </p>
          
        )}
      </div>
    </section>
  )
};

export default SignIn;
