import React, { useState, useEffect } from "react";
import Style from "./Navbar.module.scss";
import { useRouter } from "next/router";
import { auth } from "../../Firebase/Firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState();
  const navigate = useRouter();

  useEffect(() => {
    let loginData = localStorage.getItem("login");
    setLoginCheck(loginData);
  }, []);

  const logout = async () => {
    localStorage.removeItem("login");
    localStorage.removeItem("name");
    localStorage.removeItem("uid");
    await signOut(auth);
    window.location.reload();
  };

  return (
    <nav className={Style.nav}>
      <h2>Blog-app</h2>
      <ul>
        <li onClick={() => navigate.push("/")}>Home</li>

        {loginCheck ? (
          <>
            <li onClick={() => navigate.push("/post")}>Add Post</li>
            <li onClick={() => navigate.push("/myposts")}>My Posts</li>
            <li onClick={logout}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={() => navigate.push("/user/login")}>Login</li>
            <li onClick={() => navigate.push("/user/signup")}>Signup</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
