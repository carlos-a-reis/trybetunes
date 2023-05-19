import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/trybetunes/" component={ Search } />
            <Route exact path="/trybetunes/album/:id" component={ Album } />
            <Route exact path="/trybetunes/favorites" component={ Favorites } />
            <Route exact path="/trybetunes/profile" component={ Profile } />
            <Route exact path="/trybetunes/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
