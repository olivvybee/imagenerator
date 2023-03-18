import { GeneratorPage } from '../../components/GeneratorPage';
import { excitedSlimeGenerator } from '../../generators';

const ExcitedSlimeGenerator = () => (
  <GeneratorPage generator={excitedSlimeGenerator} />
);

export { excitedSlimeGenerator as generator };
export default ExcitedSlimeGenerator;
