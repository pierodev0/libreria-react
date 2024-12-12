import { useEffect } from 'react';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import { useState } from 'react';
import { Libro } from './components/Libro';
import IconCart from './components/IconCart';
import { CartItem } from './components/CartItem';
import { useRef } from 'react';
import { IconWhatsapp } from './components/IconWhatsapp';
import IconClose from './components/IconClose';
import useAppContext from 'context/useAppContext';

function App() {
  const PHONE_NUMBER = '996506060';
  const { state } = useAppContext();
  const [showCart, setShowCart] = useState(false);

  //State Derivado
  const cartTotal = state.cart.reduce(
    (total, item) => total + item.cantidad * (item.precio || 1),
    0,
  );

  const modalRef = useRef<HTMLUListElement>(null);

  const checkClickOutside = (e: MouseEvent) => {
    if (
      showCart &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      setShowCart(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', checkClickOutside);
    return () => document.removeEventListener('mousedown', checkClickOutside);
  }, [showCart]);

  function handleMessage() {
    let mensaje = '';

    mensaje = '*Buenas estoy interesado en los siguiente libros:* %0A';
    if (state.cart.length) {
      console.log('Hay items');
      state.cart.forEach((articulo) => {
        mensaje += '--------------- %0A';
        mensaje += `Libro: ${encodeURIComponent(articulo.titulo)}`;
        mensaje += '%0A';
        mensaje += `Autor: ${encodeURIComponent(articulo.autor)}`;
        mensaje += '%0A';
        mensaje += `Pag: ${encodeURIComponent(articulo.paginas)}`;
        mensaje += '%0A';
        // mensaje += `Subtotal: ${encodeURIComponent(
        //   articulo.quantity * articulo.precio,
        // )}`;
      });
      mensaje += '--------------- %0A';
      // mensaje += `Total a pagar: ${cartTotal}`;
    } else {
      mensaje = '*Buenas estoy interesado en comprar sus libros* %0A';
      console.log('No hay items');
    }

    // Crear enlace de WhatsApp con los datos
    const url = `https://wa.me/${PHONE_NUMBER}?text=${mensaje}`;

    // Abrir enlace en nueva pestaña
    window.open(url);
  }

  return (
    <>
      <header>
        <nav className='bg-black border-gray-200 px-4 lg:px-6 py-3.5 fixed top-0 right-0 h-[70px] w-full z-10'>
          <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
            <a
              href='#'
              className='flex items-center'
            >
              <img
                src='/ediciones.png'
                className='mr-3 h-9 sm:h-9'
                alt='Flowbite Logo'
              />
            </a>
            {/* Dropdown  Desktop*/}
            <section className='relative block'>
              {/* CartiIcon */}

              {!showCart ? (
                <div
                  className=' hover:cursor-pointer relative '
                  onClick={() => setShowCart(!showCart)}
                >
                  <IconCart />
                  {state.cart.length !== 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 rounded-full  '>
                      <div className=' flex w-6 h-6  text-white text-sm justify-center items-center '>
                        {state.cart.length}
                      </div>
                    </span>
                  )}
                </div>
              ) : (
                <IconClose />
              )}

              {/* CartiIcon */}

              <ul
                ref={modalRef}
                className={` bg-white shadow-md  rounded-sm absolute -right-4 sm:right-0 mt-5 sm:mt-2 w-[100vw] sm:w-[350px] sm:p-2 ${
                  showCart ? null : 'hidden'
                }`}
              >
                <div className='max-h-[calc(100vh-200px)] sm:max-h-[500px] overflow-y-auto divide-y  divide-gray-300'>
                  {state.cart.length === 0 ? (
                    <p className='text-center p-3'>El carrito esta vacio</p>
                  ) : (
                    state.cart.map((book) => (
                      <CartItem
                        key={book.id}
                        book={book}
                      />
                    ))
                  )}
                </div>
                <div className={`p-2 space-y-2 `}>
                  {/* {cart.length !== 0 && (
                    <p className='text-2xl font-bold'>Total: S./{cartTotal}</p>
                  )} */}
                  <button
                    className='bg-green-500 w-full p-2 rounded-xl text-white font-bold flex items-center justify-center'
                    onClick={handleMessage}
                  >
                    <span>
                      <IconWhatsapp />
                    </span>{' '}
                    Mandar mensaje
                  </button>
                </div>
              </ul>
            </section>{' '}
            {/* End Dropdown Desktop*/}
          </div>
        </nav>
      </header>
      <main className='mx-auto max-w-5xl px-4 py-8 min-h-[calc(100vh-60px)]  absolute top-[60px] left-0 right-0'>
        <h1 className='text-4xl lg:text-5xl font-extrabold mb-6 text-indigo-700 text-center'>
          Nuestro Catalogo de libros
        </h1>

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
      </main>
    </>
  );
}

export default App;
