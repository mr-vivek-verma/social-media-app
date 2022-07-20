import React, { useRef, useEffect } from "react";
import Style from "../../styles/main.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const form = useRef();
  const navigate = useRouter();

  useEffect(() => {
    let loginData = localStorage.getItem("login");

    if (loginData) {
      navigate.replace("/");
    }
  }, [navigate]);

  const initialValues = { email: "", password: "" };

  const validate = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const handleSubmitData = async (value) => {
    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      localStorage.setItem("login", true);
      navigate.push("/");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        console.log("user not found!");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        console.log("wrong password!");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className={Style.login__container}>
        <div className={Style.login__wrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={handleSubmitData}
          >
            <Form ref={form}>
              <div className={Style.input__wrapper}>
                <Field type="text" placeholder="Email" name="email" />
                <div className={Style.error__message}>
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className={Style.input__wrapper}>
                <Field type="password" placeholder="Password" name="password" />
                <div className={Style.error__message}>
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className={Style.input__wrapper}>
                <button type="submit">Login</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
