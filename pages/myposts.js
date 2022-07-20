import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { auth, db } from "../Firebase/Firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Style from "../styles/main.module.scss";
import { useRouter } from "next/router";

const Mypage = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let loginData = localStorage.getItem("login");

    if (!loginData) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const collectionRef = collection(db, "users", uid, "posts");

    const getUser = async () => {
      const allPosts = await getDocs(collectionRef);
      setPosts(
        allPosts.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }))
      );
    };

    getUser();
  }, []);

  const handlePosts = (slug, id) => {
    localStorage.setItem("postid", id);
    router.push(`/mypage/${slug}`);
  };

  return (
    <>
      <Navbar />
      <div className="container-xxl" id={Style.home__container}>
        <div className="row gy-5">
          {posts.map((post, i) => {
            return (
              <div className="col-4" key={i}>
                <div
                  className={Style.card}
                  onClick={() => handlePosts(post.slug, post.id)}
                >
                  <div className={Style.card__img}>
                    <img src={post.img} alt={post.title} />
                  </div>
                  <div className={Style.card__content}>
                    <p>{post.title}</p>
                    <span>Auther :- {post.auth}</span> <br />
                    <span>Category :- {post.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Mypage;
