
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";


export const useStory = () => {
    

    const dispatch = useDispatch();

    const [preview, setPreview] = useState(null)
     const [fileType, setFileType] = useState(null)
      const [showStory, setShowStory] = useState(false);

     const handleFileChange=(e)=>{
      let file=e.target.files?.[0]
      if(!file) return
      setPreview(URL.createObjectURL(file))
      setFileType(file.type)
     }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm();

    const storySubmit = (data) => {
          const file = data.story?.[0];
    if (!file) return;
    console.log("Selected file:", file);
    };

    return {
        register,
        handleSubmit,
        errors,
        setValue,
        reset,
       storySubmit,
       preview,handleFileChange,fileType,showStory,setShowStory
    };
};