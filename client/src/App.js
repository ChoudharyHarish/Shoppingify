import './App.css';
import { useEffect } from 'react';
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthenticated, getAllItems } from "./redux/authSlice"
import Router from './components/Router';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthenticated());
    if (isAuthenticated) {
      dispatch(getAllItems());
    }
  }, [dispatch, isAuthenticated])


  return (
    <div className="App">

      {!isAuthenticated ? <Auth /> :
        <Router>
          <Home />
        </Router>}
    </div>
  );
}

export default App;
