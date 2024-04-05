export const Libro = ({ libro,addToCart }) => {
  return (
    <div
      className={`bg-white  p-4 rounded-lg shadow-lg ${libro.selected ? "!bg-blue-300" : null}`}
      key={libro.id}
    >
      <div className='h-[250px] flex justify-center'>
        <img
          className='object-contain rounded-lg'
          src={`${libro.imagen}`}
        />
      </div>
      <div className='flex flex-col p-2 gap-1'>
        <p className='autor text-gray-500  text-sm line-clamp-2 text-center min-h-[40px] sm:min-h-0'>
          {libro.autor}
        </p>
        <p className='titulo text-blue-600 font-bold line-clamp-2 min-h-[50px] uppercase text-center'>
          {' '}
          {libro.titulo}
        </p>
        <div className='flex justify-center gap-2 flex-col items-center sm:flex-row sm:gap-7'>
          <p className='inline-block'>
            Pag: <span className='paginas'>{libro.paginas}</span>
          </p>
          <p className='inline-block'>
            Papel: <span className='papel'>{libro.papel}</span>
          </p>
        </div>
        {/* <p className='font-bold text-2xl text-center mt-2 mb-2'>
          S/ <span className='precio'>{libro.precio}</span>
        </p> */}
        <button
          id='boton-libro'
          className={`bg-green-500 hover:bg-green-700 w-full p-2 rounded-full text-white font-bold uppercase ${libro.selected ? "!bg-blue-500"  : null}`}
          onClick={() => addToCart(libro)}
        >
          {libro.selected ? "Agregado" : "Agregar"}
        </button>
      </div>
    </div>
  );
};
