import React from 'react'
import { useState, useRef, useEffect } from "react";
import "./style.css";
import { useForm, Controller } from "react-hook-form";
import { Card } from 'primereact/card';
import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import authSlice, { login, signup } from '../../../reducer/auth.slice';
import { ProgressSpinner } from 'primereact/progressspinner';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';

const Login = () => {

  const toast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogedIn, user, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (isLogedIn) {
      if (user.role == 'admin') {
        navigate('/admin')
      }
      else {
        navigate("/gameIntro");
      }
    }
  }, [isLogedIn])

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });



  const onSubmit = (data) => {
    console.log(data)
    const __data = {
      email: data.email,
      password: data.password
    }

    dispatch(login(__data))
      .unwrap()
      .then((res) => {
        // console.log(res)
        if (user.role == 'admin') {
          navigate('/admin')
        }
        else {
          navigate("/gameIntro");
        }

      })
      .catch((err) => {
        // console.log(err)
        toast.current.show({
          severity: "error",
          detail: err.message,
          life: 3000,
        });
      });


  }

  return (
    <div className='flex justify-content-center align-items-center mt-5'>
      <Toast ref={toast} />
      {
        loading ? <ProgressSpinner className='mt-8 pt-8' /> :
          <MDBContainer fluid className="p-3 my-5">

            <MDBRow>

              <MDBCol col='10' md='6'>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
              </MDBCol>

              <MDBCol col='4' md='6'>


                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />


                <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                  <a href="!#">Forgot password?</a>
                </div>
                <MDBBtn className="mb-4 w-100" size="lg" onClick={()=>{navigate("/register");}} >Sign in</MDBBtn>
                <MDBBtn className="mb-4 w-100" size="lg" onClick={()=>{navigate("/register");}} >Sign up</MDBBtn>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">OR</p>
                </div>

                <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                  <MDBIcon fab icon="facebook-f" className="mx-2" />
                  Continue with facebook
                </MDBBtn>

                <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#55acee' }}>
                  <MDBIcon fab icon="twitter" className="mx-2" />
                  Continue with twitter
                </MDBBtn>

              </MDBCol>

            </MDBRow>

          </MDBContainer>
      }
    </div>
  )
}

export default Login
