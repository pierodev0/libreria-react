import { useState } from 'react';
import { IconTrash } from './IconTrash';

export const CartItem = ({
  book,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  changeQuantity,
}) => {
  const [quantity, setQuantity] = useState(book.quantity);

  function handleInput(id, value) {
    setQuantity(value);
    changeQuantity(id, value);
  }
  return (
    <li className='flex gap-2 p-2 '>
      <div className=' '>
        <img
          src={`${book.imagen}`}
          alt=''
          className='object-contain w-24'
        />
      </div>
      <div className=' flex gap-1 p-1  w-2/3 '>
        <div className='flex-1'>
          <p className='text-normal font-bold text-blue-500'>{book.titulo}</p>
          <p>{book.autor}</p>
          <p>Pag: {book.paginas}</p>
          <p>Papel: {book.papel}</p>
          {/* <div className='flex items-center border-gray-100 bg-red'>
            <span className='rounded-l bg-gray-100 text-sm mr-2'>
              Cant:
            </span>
            <input
              className='h-8 w-20 border bg-white text-center text-xs outline-none'
              type='number'
              value={quantity}
              min='1'
              onChange={(e) => handleInput(book.id, +e.target.value)}
            />
          </div>
          <p className='text-sm text-gray-600'>
            Prec. Uni :{' '}
            <span className='font-bold'> S/ {book.precio}</span>
          </p>
          <p>
            Subtotal :{' '}
            <span className='font-bold text-blue-700'> S/ {book.precio * quantity}</span>
          </p> */}
        </div>
        <IconTrash onClick={() => removeItem(book.id)} />
      </div>
    </li>
  );
};
