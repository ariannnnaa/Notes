import banner from '../assets/images/banner.jpg' //логотип заметок

const Home = () => {
    return (
        <section className="bg-gradient-to-tr from-pink-800 to-blue-900 flex flex-col text-center items-center py-10">
            <h1 className="text-yellow-400 text-2xl lg:text-5xl font-extrabold mb-4">Добро пожаловать в личные заметки !</h1>
            <p className="text-yellow-200 lg:text-xl font-semibold">Зарегестрируйтесь или войдите в свой аккаунт,
                <br />
            чтобы начать вести свои записи.</p>
            <img src={banner} className='mt-3 size-80 rounded-xl' alt="notes" />
        </section>
    );
}

export default Home;
