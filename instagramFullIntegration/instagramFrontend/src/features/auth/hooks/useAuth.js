import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from "react-toastify";
import { addUser } from '../state/authUser';

export const useAuth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [registerUser, setRegisterUser] = useState(() => {
        return JSON.parse(localStorage.getItem("registerUser")) || []
    })


    const { register, handleSubmit, reset, watch } = useForm()

    const registerUserForm = (data) => {
        const arr = [...registerUser, data]
        localStorage.setItem("registerUser", JSON.stringify(arr))
        setRegisterUser(arr)
        navigate('/login')
        toast.success("registration succesfully")


    }


    const loginUserForm = (data) => {


        const existUser = registerUser.find((u) => u.email === data.email && u.password === data.password)
        if (existUser) {
            localStorage.setItem("authenticatedUser", JSON.stringify(existUser))
            dispatch(addUser(existUser))
            toast.success("login succefully")
            navigate('/')

        } else {
            toast.error("login failed")
        }

    }




    return {
        navigate,
        dispatch,
        register,
        handleSubmit,

        watch,
        registerUserForm,

        loginUserForm
    }
}