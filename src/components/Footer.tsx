import IconFacebook from 'components/Icons/IconFacebook';
import IconInstagram from 'components/Icons/IconInstagram';
import IconPinterest from 'components/Icons/IconPinterest';
import IconTwitter from 'components/Icons/IconTwitter';
import IconYoutube from 'components/Icons/IconYoutube';
import { Link } from 'react-router';

function Footer() {
  return (
    <>
      <footer className='bg-blue-950 text-white py-10'>
        <section className='wrapper max-sm:space-y-8 layout-grid'>
          <div className='flex justify-center footer__logo h-6 sm:justify-start'>
            <img
              src='/ediciones.png'
              alt='Logo landing'
              className='h-12'
            />
          </div>
          <div className='flex gap-2 justify-center sm:justify-start sm:items-end footer__icons'>
            <IconFacebook className='hover:text-emerald-400 hover:cursor-pointer max-sm:!size-7' />
            <IconYoutube className='hover:text-emerald-400 hover:cursor-pointer max-sm:!size-7' />
            <IconTwitter className='hover:text-emerald-400 hover:cursor- max-sm:!size-7' />
            <IconPinterest className='hover:text-emerald-400 hover:cursor-pointer max-sm:!size-7' />
            <IconInstagram className='hover:text-emerald-400 hover:cursor-pointer max-sm:!size-7' />
          </div>
          <div className='px-4 flex flex-col text-center sm:text-start sm:grid sm:grid-cols-2 footer__links'>
            <div className='flex flex-col'>
              <Link
                className='hover:text-emerald-400 text-gray-300 py-2'
                to='/about'
              >
                Nosotros
              </Link>
              <a
                className='hover:text-emerald-400 text-gray-300 py-2'
                href='#'
              >
                Contacto
              </a>
              <a
                className='hover:text-emerald-400 text-gray-300 py-2'
                href='#'
              >
                Blog
              </a>
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 sm:items-end sm:justify-between footer__copyright'>
            <button className='h-11 px-6 bg-green-500 font-bold rounded-md'>
              Contacto
            </button>
            <p className='text-center text-gray-300'>
              Copyright {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </section>
      </footer>
    </>
  );
}

export default Footer;
