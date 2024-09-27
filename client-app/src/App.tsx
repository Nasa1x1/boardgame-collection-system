import './styles.css'
import { Container } from 'semantic-ui-react';
import NavBar from './mainpage/NavBar';
import { observer } from 'mobx-react-lite';
import { useLocation, Outlet } from 'react-router-dom';
import HomePage from './mainpage/Homepage';
import { ToastContainer } from 'react-toastify';
import { useStore } from './stores/store';
import { useEffect } from 'react';
import LoadingComponent from './mainpage/Loading';
import Modal from './mainpage/Modal';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])
  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <Modal/>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);