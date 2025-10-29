import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form"
import { api } from "../lib/api";
type ProfileForm = {
    name: string;
    bio: string;
    skills: {value: string}[];
}
const Profile = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const {register, control, handleSubmit, reset, formState: {errors}} = useForm<ProfileForm>({
        defaultValues: {
            name: "",
            bio: "",
            skills: [{value: ""}],
        }
    });
    useEffect(() => {
        api.get("/users/1").then(res => {
            reset({
                name: res.data.name,
                bio: res.data.bio,
                skills: res.data.skills.map((skill: string) => ({ value: skill })),
            });
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, [reset]);
    const onSubmit = async (data: ProfileForm) => {
        setIsSaving(true);
        try {
            await api.put("/users/1", {
                name: data.name,
                bio: data.bio,
                skills: data.skills.map(skill => skill.value),
            });
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000)
        } catch (err) {
            console.log(err)
        } finally {
            setIsSaving(false)
        }
        
    };
    const {fields, append, remove} = useFieldArray({
        control,
        name: "skills",
    })
    if (loading) {
        return <p className="text-center mt-20 text-gray-500">Загрузка данных...</p>
    }
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
            <div className="mb-6">
                <label className="block mb-2 font-medium">Навыки</label>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2 mb-2">
                        <input {...register(`skills.${index}.value` as const, {
                            required: "Введите навык",
                        })} className="flex-1 border rounded-md p-2" placeholder={`Навык ${index + 1}`}/>
                        <button type="button" onClick={() => remove(index)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">×</button>
                    </div>
                ))}
                <button type="button" onClick={() => append({ value: "" })} className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    + Добавить навык
                </button>
            </div>
            {/* Сохранить */}
            <button type="submit" className={`w-full py-2 rounded-md transition ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}>
                {isSaving ? "Сохраняется..." : "Сохранить изменения"}
            </button>
            
            {isSaved && (
                <p className="text-green-600 text-center mt-4 font-medium transition">✅ Изменения сохранены!</p>
            )}
        </form>
    </section>
  )
}

export default Profile
