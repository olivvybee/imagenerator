import { GeneratorPage } from '../../components/GeneratorPage';
import { interruptingCrowGenerator } from '../../generators/InterruptingCrow';

const InterruptingCrowGenerator = () => (
  <GeneratorPage generator={interruptingCrowGenerator} />
);

export default InterruptingCrowGenerator;

export { interruptingCrowGenerator as generator };
