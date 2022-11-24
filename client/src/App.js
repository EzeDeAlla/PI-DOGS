import './App.css';
import { Route } from 'react-router-dom';
import DogCards from './components/Home/home';
import DogDetail from './components/DogDetail/DogDetail';
import CreateDog from './components/Formulario/Formulario';
import DogDetailByName from './components/DogDetail/DogDetailByName';
import LandingPage from './components/LandingPage/landingPage';
import SearchBar from './components/SearchBar/searchbar';



function App() {
  return (
    <div className="fotoDeFondo">
      <Route
        path={["/home", "/detail/:id", "/form", "/detailByName"]}
        component={SearchBar}
      />
      <Route path="/home" component={DogCards} />
      <Route path="/detail/:id" component={DogDetail} />
      <Route path="/form" component={CreateDog} />
      <Route path="/detailByName" component={DogDetailByName} />
      <Route exact path="/" component={LandingPage} />
    </div>
  );
}

export default App;
