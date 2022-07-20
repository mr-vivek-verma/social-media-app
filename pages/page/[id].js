import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import Navbar from "../../components/navbar/Navbar";
import Style from "../../styles/main.module.scss";

const Page = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const postid = localStorage.getItem("postid");
    const userDoc = doc(db, "posts", postid);

    const getUser = async () => {
      const data = await getDoc(userDoc);
      setPost(data.data());
    };

    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <Head></Head>

      <div className="container-xxl" id={Style.post__container}>
        {post && (
          <div className="row">
            <div className="col-8">
              <div className={Style.page__container}>
                <div className={Style.page__cover}>
                  <img src={post.img} alt={post.title} />
                </div>
                <h1>{post.title}</h1>
                <p>{post.desc}</p>
                <div className={Style.page__Wrapper}>
                  <div className={Style.category}>{post.category}</div>
                  <div className={Style.tags}>
                    <ul>
                      {post?.tags?.map((tag, i) => {
                        return <li key={i}>{tag}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
