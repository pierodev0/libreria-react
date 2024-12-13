import { Route, Routes } from 'react-router';
import HomeLayout from 'layouts/HomeLayout';
import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<HomeLayout />}
        >
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/about'
            element={<AboutPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
