import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { generators } from './generators';
import { GeneratorPage } from './pages';

import './App.css';
import { PageLayout } from './components/PageLayout/PageLayout';

const App = () => (
  <>
    <Helmet>
      <title>imagenerator</title>
    </Helmet>
    <Router>
      <PageLayout>
        <Routes>
          {generators.map((generator) => (
            <Route
              key={generator.route}
              path={generator.route}
              element={<GeneratorPage generator={generator} />}
            />
          ))}

          <Route path="/" element={<div>Homepage</div>} />

          <Route path="*" element={<div>404</div>} />
        </Routes>
      </PageLayout>
    </Router>
  </>
);

export default App;
