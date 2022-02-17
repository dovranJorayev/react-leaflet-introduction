import { PageRoutes } from 'assets/constans/PageRoutes';
import MultiLayerMapPage from 'pages/MultiLayerMapPage';
import PlainMapPage from 'pages/PlainMapPage';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path={PageRoutes.MULTI_LAYER_MAP_PAGE}>
          <MultiLayerMapPage/>
        </Route>

        <Route path={PageRoutes.PLAIN_MAP_PAGE}>
          <PlainMapPage/>
        </Route>

        <Redirect to={PageRoutes.MULTI_LAYER_MAP_PAGE}/>
      </Switch>
    </Router>
  );
}

export default App;