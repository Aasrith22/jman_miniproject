// import '../../styles/form.css';
// import { useState } from "react";
// import { CreateSectionDto } from "../../types/lms";
// import { createSection } from "../../api/sectionapi";

// interface Props {
//   moduleId: string;
//   onSuccess: () => void;
// }

// const SectionForm = ({ moduleId, onSuccess }: Props) => {
//   const [section_title, setTitle] = useState("");
//   const [section_content, setContent] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const data: CreateSectionDto = {
//       section_title,
//       module_id:moduleId,
//     };

//     await createSection(data);
//     onSuccess();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add Section</h2>
//       <input
//         placeholder="Section Title"
//         value={section_title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <textarea
//         placeholder="Section Content"
//         value={section_content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button>Add</button>
//     </form>
//   );
// };

// export default SectionForm;

import "../../styles/form.css";
import { useState } from "react";
import { CreateSectionDto } from "../../types/lms";
import { createSection } from "../../api/sectionapi";

interface Props {
  moduleId: string;
  onSuccess: () => void;
}

const SectionForm = ({ moduleId, onSuccess }: Props) => {

  const [section_title, setTitle] = useState("");
  const [section_content, setContent] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [image_description, setImageDescription] = useState("");
  const [url_description, setUrlDescription] = useState("");

  const uploadToCloudinary = async (file: File, resourceType: "image" | "video") => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lms_upload");

    const cloudName = "do3cfxerr";

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";
    let videoUrl = "";

    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile, "image");
    }

    if (videoFile) {
      videoUrl = await uploadToCloudinary(videoFile, "video");
    }

    const data: CreateSectionDto = {
      section_title,
      section_content,
      module_id: moduleId,
      section_images: imageUrl || undefined,
      image_description: image_description || undefined,
      content_url: videoUrl || undefined,
      url_description: url_description || undefined,
    };

    await createSection(data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>Add Section</h2>

      <input
        placeholder="Section Title"
        value={section_title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Section Content"
        value={section_content}
        onChange={(e) => setContent(e.target.value)}
      />

      <h3>Upload Image</h3>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <input
        placeholder="Image Description"
        value={image_description}
        onChange={(e) => setImageDescription(e.target.value)}
      />

      <h3>Upload Video</h3>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
      />

      <input
        placeholder="Video Description"
        value={url_description}
        onChange={(e) => setUrlDescription(e.target.value)}
      />

      <button type="submit">Add</button>

    </form>
  );
};

export default SectionForm;