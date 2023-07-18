import { GeneratorPage } from '../../components/GeneratorPage';
import { sorryImLateGenerator } from '../../generators/SorryImLate';

const SorryImLateGenerator = () => (
  <GeneratorPage generator={sorryImLateGenerator} />
);

export default SorryImLateGenerator;

export { sorryImLateGenerator as generator };
