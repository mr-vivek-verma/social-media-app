import React, { useRef, useEffect } from "react";
import Style from "../../styles/main.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { auth, db } from "../../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import Navbar from "../../components/navbar/Navbar";
import { useRouter } from "next/router";

const Signup = () => {
  const form = useRef();
  const navigate = useRouter();

  useEffect(() => {
    let loginData = localStorage.getItem("login");

    if (loginData) {
      navigate.replace("/");
    }
  }, [navigate]);

  const initialValues = { name: "", email: "", password: "" };

  const validate = yup.object().shape({
    name: yup.string().required("Please enter your name"),

    email: yup.string().email().required("Please enter your email"),

    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const handleSubmitData = async (value) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      await setDoc(doc(db, "users", user.user.uid), {
        name: value.name,
        email: value.email,
        password: value.password,
        createdAt: serverTimestamp(),
      });

      localStorage.setItem("login", true);
      localStorage.setItem("uid", user.user.uid);
      navigate.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className={Style.signup__container}>
        <div className={Style.signup__wrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={handleSubmitData}
          >
            <Form ref={form}>
              <div className={Style.input__wrapper}>
                <Field type="text" placeholder="Name" name="name" />

                <div className={Style.error__message}>
                  <ErrorMessage name="name" />
                </div>
              </div>

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
                <button type="submit" className={Style.submitBtn}>
                  Register
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Signup;
