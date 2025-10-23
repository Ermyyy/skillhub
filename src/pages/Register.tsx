import { useForm } from "react-hook-form"
import { data } from "react-router-dom"

type RegisterForm = {
    email: string
    password: string
    confirmPassword: string
}
const Register = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<RegisterForm>()
    const password = watch("password")

    const onSubmit = (data: RegisterForm) => console.log("Register:", data)

  return (
    <section className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <input type="email" id="email" className="w-full border rounded-md p-2" {...register("email", {
                    required: "Введи email",
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                        message: "Некорректный email",
                    }
                })}/>
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-medium">Пароль</label>
                <input type="password" className="w-full border rounded-md p-2" id="password" {...register("password", {
                    required: "Введите пароль",
                    minLength: {value: 6, message: "Минимум 6 символов"}
                })}/>
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <div className="mb-6">
                
            </div>
        </form>
    </section>
  )
}

export default Register
