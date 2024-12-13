import Footer from 'components/Footer';
import Nav from 'components/Nav';
import { Outlet } from 'react-router';

function HomeLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default HomeLayout;
