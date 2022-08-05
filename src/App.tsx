import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { LegacyGeneratorPage, Homepage } from './pages';
import { MetaTags, PageLayout } from './components';
import { legacyGenerators } from './legacyGenerators';

import './App.css';

const App = () => (
  <>
    <Helmet>
      <title>imagenerator</title>
    </Helmet>
    <Router>
      <MetaTags />
      <PageLayout>
        <Routes>
          {legacyGenerators.map((generator) => (
            <Route
              key={generator.route}
              path={generator.route}
              element={<LegacyGeneratorPage generator={generator} />}
            />
          ))}

          <Route path="/" element={<Homepage />} />

          <Route path="*" element={<div>404</div>} />
        </Routes>
      </PageLayout>
    </Router>
  </>
);

export default App;
