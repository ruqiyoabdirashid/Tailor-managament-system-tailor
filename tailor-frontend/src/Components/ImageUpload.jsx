import { useState } from "react";

export default function ImageUpload({ onChange, defaultImage = "/images/default-avatar.svg" }) {
  const [preview, setPreview] = useState(defaultImage);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  
}
