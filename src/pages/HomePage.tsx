import Carousel from 'components/Carousel';
import { Libro } from 'components/Libro';
import useAppContext from 'context/useAppContext';

function HomePage() {
  const { state } = useAppContext();
  return (
    <>
      <main className='pt-20'>
        <Carousel />
        <section className='mx-auto max-w-5xl px-4 py-8'>
          <h1 className='text-4xl lg:text-5xl font-extrabold mb-6 text-indigo-700 text-center'>
            Nuestro Catalogo de libros
          </h1>
          <h2 className='text-2xl text-center mb-2 lg:mb-8 text-gray-600'>
            Revisa nuestra fabuloso catalogo que incluye mas de{' '}
            {Math.floor(state.data.length / 10) * 10} libros
          </h2>
          <ul
            id='lista-libros'
            className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'
          >
            {state.data.map((libro) => (
              <Libro
                key={libro.id}
                libro={libro}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default HomePage;
