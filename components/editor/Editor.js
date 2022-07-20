import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Editor = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <ReactQuill value={value} onChange={setValue} />
    </div>
  );
};

export default Editor;
