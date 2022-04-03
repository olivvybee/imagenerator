import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import { generators } from './generators';

const App = () => (
  <Router>
    <Routes>
      {generators.map((generator) => (
        <Route
          path={generator.route}
          element={<div>Generator {generator.title}</div>}
        />
      ))}

      <Route path="/" element={<div>Homepage</div>} />

      <Route path="*" element={<div>404</div>} />
    </Routes>
  </Router>
);

export default App;
