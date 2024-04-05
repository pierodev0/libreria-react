import { useEffect } from 'react';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import { useState } from 'react';
import { Libro } from './components/Libro';
import IconCart from './components/IconCart';
import { CartItem } from './components/CartItem';
import { useRef } from 'react';
import { IconWhatsapp } from './components/IconWhatsapp';
import IconClose from './components/IconClose';

function App() {
  const MIN_ITEMS = 1;
  const MAX_ITEMS = 9000000;

  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  //State Derivado
  const cartTotal = cart.reduce(
    (total, item) => total + item.quantity * item.precio,
    0,
  );

  function addToCart(item) {
    const updatedData = data.map((book) => {
      if (book.id === item.id) {
        return { ...book, selected: true };
      }
      return book;
    });

    setData(updatedData);
    const itemExist = cart.findIndex((cartItem) => cartItem.id == item.id);
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }
  function changeQuantity(id, value) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: value,
        };
      }
      return item;
    });

    setCart(updatedCart);
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  function removeItem(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    const updatedData = data.map((book) => {
      if (book.id === id) {
        return { ...book, selected: false };
      }
      return book;
    });

    setData(updatedData);
  }

  useEffect(() => {
    const parser = new PublicGoogleSheetsParser(
      '15bJDxtjRCyGkKYYwytL49mmbYmt35q-C2L6WW6HpuHw',
    );
    parser.parse().then((data) => {
      setData(data);
    });
  }, []);

  let modalRef = useRef();

  function checkClickOutside(e) {
    if (showCart && !modalRef.current.contains(e.target)) {
      setShowCart(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', checkClickOutside);
    return () => document.removeEventListener('mousedown', checkClickOutside);
  }, [showCart]);

  function handleMessage() {
    let mensaje = '';

    mensaje = '*Buenas estoy interesado en los siguiente libros:* %0A';
    if (cart.length) {
      console.log('Hay items');
      cart.forEach((articulo) => {
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
    const url = `https://wa.me/922446371?text=${mensaje}`;

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
                  {cart.length !== 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 rounded-full  '>
                      <div className=' flex w-6 h-6  text-white text-sm justify-center items-center '>
                        {cart.length}
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
                  {cart.length === 0 ? (
                    <p className='text-center p-3'>El carrito esta vacio</p>
                  ) : (
                    cart.map((book) => (
                      <CartItem
                        key={book.id}
                        book={book}
                        removeItem={removeItem}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        changeQuantity={changeQuantity}
                        cart={cart}
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
          {data.map((libro) => (
            <Libro
              key={libro.id}
              libro={libro}
              addToCart={addToCart}
            />
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
