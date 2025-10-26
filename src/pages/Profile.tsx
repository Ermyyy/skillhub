import { useFieldArray, useForm } from "react-hook-form"

type ProfileForm = {
    name: string;
    bio: string;
    skills: {value: string}[];
}
const Profile = () => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<ProfileForm>({
        defaultValues: {
            name: "",
            bio: "",
            skills: [{value: ""}],
        }
    });
    const onSubmit = (data: ProfileForm) => {
        console.log(data)
    };
    const {fields, append, remove} = useFieldArray({
        control,
        name: "skills",
    })
  return (
    <section className="max-w-xl mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Редактирование профиля</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Имя */}
            <div className="mb-4">
                <label className="block mb-1 font-medium">Имя</label>
                <input className="w-full border rounded-md p-2" {...register("name", {
                    required: "Введите имя"
                })}/>
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>
            {/* Bio */}
            <div className="mb-4">
                <label className="block mb-1 font-medium">О себе</label>
                <textarea className="w-full border rounded-md p-2"  rows={3} {...register("bio", {
                    required: 'Напиши что-нибудь о себе'
                })}/>
                <p className="text-red-500 text-sm">{errors.bio?.message}</p>
            </div>
            {/* Навыки */}

            {/* Сохранить */}
            <button type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Сохранить изменения
            </button>
        </form>
    </section>
  )
}

export default Profile
