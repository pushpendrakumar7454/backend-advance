import { useForm } from "react-hook-form"
import { addPost } from "../state/postSlice"
import { useDispatch } from "react-redux"

export const useAuthpost = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const dispatch = useDispatch()
    const submitPost = (data) => {
        console.log(data)
        dispatch(addPost(data))
        reset()
    }
    return {
        register,
        handleSubmit,
        errors,
        reset,
        submitPost
    }
}