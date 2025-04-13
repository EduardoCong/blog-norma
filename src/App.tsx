import { Toaster } from 'react-hot-toast';
import RoutesApp from './presentation/routes/routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          fontSize: "16px",
          padding: "16px 24px",
          borderRadius: "12px",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontWeight: "800",
        },
      }}
    ></Toaster>
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;