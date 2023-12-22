import { GeneratorPage } from '../../components/GeneratorPage';
import { emissionsFaultGenerator } from '../../generators/EmissionsFault';

const EmissionsFaultGenerator = () => (
  <GeneratorPage generator={emissionsFaultGenerator} />
);

export default EmissionsFaultGenerator;

export { emissionsFaultGenerator as generator };
