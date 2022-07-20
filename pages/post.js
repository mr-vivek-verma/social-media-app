import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/navbar/Navbar";
import Style from "../styles/main.module.scss";
import CategorySelect from "../components/Select/Select";
import Imagecrop from "../components/ImageCrop/Imagecrop";
import { db } from "../Firebase/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const categoryOptions = [
  { value: "Food blogs", label: "Food blogs" },
  { value: "Travel blogs", label: "Travel blogs" },
  { value: "Health and fitness blogs", label: "Health and fitness blogs" },
  { value: "Lifestyle blogs", label: "Lifestyle blogs" },
  { value: "Fashion and beauty blogs", label: "Fashion and beauty blogs" },
  { value: "Photography blogs", label: "Photography blogs" },
  { value: "Personal blogs", label: "Personal blogs" },
  { value: "DIY craft blogs", label: "DIY craft blogs" },
];

const Post = () => {
  // Title state
  const [titleValue, setTitleValue] = useState("");
  const [titleError, setTitleError] = useState(false);

  // Description state
  const [descriptionValue, setDescriptionValue] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // Slug state
  const [slugValue, setSlugValue] = useState("");
  const [slugError, setSlugError] = useState(false);

  // Category state
  const [selectValue, setSelectValue] = useState({
    value: "Food blogs",
    label: "Food blogs",
  });

  // Tags state
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);
  const [tagError, setTagError] = useState(false);

  // Author state
  const [autherName, setAutherName] = useState("");
  const [uid, setUid] = useState("");
  const [loader, setLoader] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const navigate = useRouter();

  // Get user local data

  useEffect(() => {
    let loginData = localStorage.getItem("login");
    let name = localStorage.getItem("name");
    let userUid = localStorage.getItem("uid");
    setUid(userUid);
    setAutherName(name);

    if (!loginData) {
      navigate.replace("/");
    }
  }, [navigate]);

  // Add tags to the post

  const handleAddTag = () => {
    if (tags.length <= 4) {
      setTags((oldTags) => {
        return [...oldTags, tagValue];
      });
      setTagError(false);
    } else {
      setTagError(true);
    }

    setTagValue("");
  };

  // Create slug for post

  const handleSlug = () => {
    const slug = slugValue
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setSlugValue(slug);
  };

  // Publish the post

  const handleSubmitData = async () => {
    let mainSlug;

    if (titleValue.length >= 1) {
      setTitleError(false);
    } else {
      setTitleError(true);
      return;
    }

    if (descriptionValue.length >= 1) {
      setDescriptionError(false);
    } else {
      setDescriptionError(true);
      return;
    }

    if (tags.length === 0) {
      setTagError(true);
      return;
    } else {
      setTagError(false);
    }

    if (slugValue.length === 0) {
      setSlugError(true);
      return;
    } else {
      setSlugError(false);

      const slug = slugValue
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      mainSlug = `${slug}-${day}-${month}-${year}`;
    }

    const collectionRef = collection(db, "posts");
    const userRef = collection(db, "users", uid, "posts");

    const post = {
      title: titleValue,
      desc: descriptionValue,
      category: selectValue.value,
      tags: tags,
      slug: mainSlug,
      auth: autherName,
      img: coverImage,
      createdAt: serverTimestamp(),
    };

    setLoader(true);
    await addDoc(collectionRef, post);
    await addDoc(userRef, post);
    navigate.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="container-xxl" id={Style.post__container}>
        <div className="row">
          <div className="col-8" id={Style.editor}>
            <Imagecrop setCoverImage={setCoverImage} />

            {/* Title section  */}
            <div className={Style.input__wrapper}>
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => setTitleValue(e.target.value)}
              />
              <div className={Style.error__message}>
                {titleError && <p>Please enter your title</p>}
              </div>
            </div>

            {/* Description section */}
            <div className={Style.input__wrapper}>
              <textarea
                placeholder="Description"
                onChange={(e) => setDescriptionValue(e.target.value)}
                className={Style.textarea}
              />
              <div className={Style.error__message}>
                {descriptionError && <p>Please enter your description</p>}
              </div>
            </div>

            {/* Slug section */}
            <div className={Style.input__wrapper}>
              <div className={Style.slug__wrapper}>
                <input
                  type="text"
                  placeholder="Slug"
                  value={slugValue}
                  onChange={(e) => setSlugValue(e.target.value)}
                />
                <button
                  className={Style.tagBtn}
                  onClick={handleSlug}
                  disabled={slugValue === ""}
                >
                  Generate
                </button>
              </div>

              <div className={Style.error__message}>
                {slugError && <p>Please enter your Slug</p>}
              </div>
            </div>

            {/* Publish section */}

            <div className={Style.publish__btn}>
              <button onClick={handleSubmitData}>
                {loader ? (
                  <box-icon
                    name="loader-alt"
                    animation="spin"
                    color="#ffffff"
                  ></box-icon>
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>

          <div className="col-4" id={Style.sidebar}>
            {/* Category section */}
            <h4>Category</h4>
            <CategorySelect
              options={categoryOptions}
              state={setSelectValue}
              defaultValue={categoryOptions[0]}
            />

            {/* Tags Section */}

            <div className={Style.tag__container}>
              <h4>Tags</h4>
              <ul>
                {tags.map((tag, i) => {
                  return <li key={i}>{tag}</li>;
                })}
              </ul>
            </div>

            <div className={Style.input__wrapper}>
              <input
                type="text"
                placeholder="Enter your tags"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
              />
              <button
                className={Style.tagBtn}
                onClick={handleAddTag}
                disabled={tagValue === ""}
              >
                Add Tags
              </button>
            </div>

            <div className={Style.error__message}>
              {tagError && <p>Only five tags available</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
