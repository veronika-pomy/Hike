import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

import '../style/AppContainer.css';
import '../style/SignUp.css';

import { useForm } from "react-hook-form";

const SignUp = () => {

  const { register, 
          handleSubmit, 
          watch,
          formState: { errors } 
        } = useForm();

  const form = useRef();

  const [ addUser, { error } ] = useMutation(ADD_USER);

  // callback to get the values from input boxes, save new user's data to db and navigate to Dashboard if adding user and auth successful
  const onSubmit = async (userdata, e) => {
    e.preventDefault();

    try {
      const addUserResponse = await addUser({
        variables: {
          email: userdata.email,
          username: userdata.username,
          password: userdata.password,
        },
      });
  
      const token = addUserResponse.data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    };
  
  };

  return (
    <>
      <section className='sign-up'>     
        <div
          className='sign-up-container'
        >
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
          {error && (
              <p
              className="sign-in-temp-login-msg"
              >
                Something went wrong. Please try again.
              </p>
            
          )}
        </div>
      </section>
    </>
  )
};

export default SignUp;
