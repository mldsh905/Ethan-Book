import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/home/home";
import Profile from "./components/profile/profile";
import Login from "./components/login/login";
import Search from "./components/search/search";
import Signup from "./components/signup/signup";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import store from "./store";
let persistor = persistStore(store);


function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div>
                    <BrowserRouter>
                    {/*<HashRouter>*/}
                        <Routes>
                            <Route path='/home' element={<Home/>}/>
                            {/*<Route path='/profile' element={<Profile/>}/>*/}
                            <Route path='/profile/:id' element={<Profile/>}/>
                            <Route path='/' element={<Login/>}/>
                            <Route path='/signup' element={<Signup/>}/>
                            <Route path='/search' element={<Search/>}/>
                        </Routes>
                    {/*</HashRouter>*/}
                    </BrowserRouter>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
