import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

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
                <input type="email" autoComplete="email" id="email" className="w-full border rounded-md p-2" {...register("email", {
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
                <input autoComplete="new-password" type="password" className="w-full border rounded-md p-2" id="password" {...register("password", {
                    required: "Введите пароль",
                    minLength: {value: 6, message: "Минимум 6 символов"}
                })}/>
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <div className="mb-6">
                <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                    Подтвердите пароль
                </label>
                <input autoComplete="new-password" type="password" id="confirmPassword" className="w-full border rounded-md p-2"
                    {...register("confirmPassword", {
                        required: "Подтвердите пароль",
                        validate: (val) => val === password || "Пароли не совпадают"
                    })}
                />
                <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">
                    Зарегистрироваться
            </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">Уже есть аккаунт?
            <Link to='/login' className="text-blue-600 ml-1">Войти</Link>
        </p>
    </section>
  )
}

export default Register
