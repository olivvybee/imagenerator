import { GeneratorPage } from '../../components/GeneratorPage';
import { eldenRingGenerator } from '../../generators';

const EldenRingGenerator = () => (
  <GeneratorPage generator={eldenRingGenerator} />
);

export { eldenRingGenerator as generator };
export default EldenRingGenerator;
