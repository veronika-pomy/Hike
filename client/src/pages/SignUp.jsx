import React from 'react';
import '../style/AppContainer.css';
import '../style/SignUp.css';

import { useRef } from 'react';
import { useForm } from "react-hook-form";

const SignUp = () => {

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
    console.log(userdata);
    reset();
  };

  // TODO: Add functionality to save new user's data to db
  // TODO: When user is signed up, redirect to the Dashboard page

  return (
    <section className='sign-up'>
      
      <div
        className='sign-up-container'
      >
        {/* FORM HEADER */}
        {/* <p
          className='sign-up-header'
        >
          Sign Up
        </p> */}
        {/* FORM */}
        <form
          ref={form}
          onSubmit={handleSubmit(onSubmit)}
          className='sign-up-form'
        >
          <input 
            type="text" 
            placeholder="Username"
            name="username"
            className="sign-up-username"
            {...register("username",
              {
                required: true,
              }
            )} 
          />
           {/* ERROR VALIDATION */}
           {(
            <p
              className="sign-up-error"
            >
              {errors.username?.type === "required" && "This field is required."}
            </p>
          )}
          <input 
            type="email" 
            placeholder="Email"
            name="email"
            className="sign-up-email"
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
              className="sign-up-error"
            >
              {errors.email?.type === "required" && "This field is required."}
              {errors.email?.type === "pattern" && "Invalid email. Please try again."}
            </p>
          )}
          <input 
            type="password"
            placeholder="Password"
            name="password"
            className="sign-up-password" 
            {...register("password",
              {
                required: true,
                minLength: 8,
                pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
              }
            )} 
          />
          {/* ERROR VALIDATION */}
          {(
            <p
              className="sign-up-error"
            >
              {errors.password?.type === "required" && "This field is required."}
              {errors.password?.type === "minLength" && "Password should be at least 8 characters."}
              {errors.password?.type === "pattern" && "Please include one lower case letter, one uppercase, one number, and one symbol."}
            </p>
          )}
          <input 
            type="password"
            placeholder="Confirm Password"
            name="confirmPwd"
            className="sign-up-confirmpwd"
            {...register("confirmPwd",
              {
                required: true,
                validate: (value) => {
                  if (watch('password') !== value) {
                    return false;
                  }
              }
              })
            } 
          />
          {/* ERROR VALIDATION */}
          {(
            <p
              className="sign-up-error"
            >
              {errors.confirmPwd?.type === "required" && "This field is required."}
              {errors.confirmPwd?.type === "validate" && "Your passwords need to match."}
            </p>
          )}
          <button
            className='btn btn--outline btn--medium'
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  )
};

export default SignUp;
