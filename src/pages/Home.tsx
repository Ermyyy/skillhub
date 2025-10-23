import { Link } from "react-router-dom"


const Home = () => {
  return (
    <section className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать в SkillHub</h1>
        <p className="text-lg text-gray-600 mb-8">
            Найди разработчиков, дизайнеров и энтузиастов, чтобы расти вместе
        </p>
        <Link to='/login' className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Начать сейчас
        </Link>
    </section>
  )
}

export default Home
