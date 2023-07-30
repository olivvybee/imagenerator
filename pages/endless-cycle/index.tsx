import { GeneratorPage } from '../../components/GeneratorPage';
import { endlessCycleGenerator } from '../../generators/EndlessCycle';

const EndlessCycleGenerator = () => (
  <GeneratorPage generator={endlessCycleGenerator} />
);

export default EndlessCycleGenerator;

export { endlessCycleGenerator as generator };
