import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'fontsource-roboto';
import 'fontsource-roboto/500.css';
import './index.css';

import NavBar from './components/navbar';
import LoadingPanel from './components/LoadingPanel';

const CreateNotes = React.lazy(() => import('./routes/createnotes'));
const ViewNotes = React.lazy(() => import('./routes/viewnotes'));
const ListNotes = React.lazy(() => import('./routes/listnotes'));
const NotFound404 = React.lazy(() => import('./routes/notfound404'));

function App(props) {
    const api_regex = /^\/api\/.*/;
    // if using "/api/" in the pathname, don't use React Router
    if (api_regex.test(window.location.pathname)) {
        return <div />; // must return at least an empty div
    }
    return (
        <Router>
            <NavBar />
            <div className='container'>
                <Suspense fallback={<LoadingPanel />}>
                    <Switch>
                        <Route exact path="/" component={ListNotes} />
                        <Route path="/view" component={ViewNotes} />
                        <Route path="/create" component={CreateNotes} />
                        <Route exact path='*' component={NotFound404} />
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
