import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
type LoginForm = {
    email: string, 
    password: string
}
const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>()
    const onSubmit = (data: LoginForm) => console.log("Login:", data)
  return (
    <section className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <input type="email" id="email"
                {...register("email", {
                    required: "Введите email",
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                        message: "Некорректный email",
                    }
                })}
                className="w-full border rounded-md p-2"
                />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-1 font-medium">Пароль</label>
                <input type="password" id="password" className="w-full border rounded-md p-2" {...register("password", {
                    required: "Введите пароль",
                    minLength: { value: 6, message: "Минимум 6 символов" },
                })}/>
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Войти</button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">Нет аккаунта? <Link to='/register' className="text-blue-600">Зарегистрироваться</Link></p>
    </section>
  )
}

export default Login
