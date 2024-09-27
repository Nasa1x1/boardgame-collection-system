import 'semantic-ui-css/semantic.min.css'
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { store, StoreContext } from './stores/store.tsx'
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Routes.tsx';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  );
  