import { GeneratorPage } from '../../components/GeneratorPage';
import { dramaticCrossroadsGenerator } from '../../generators/DramaticCrossroads';

const DramaticCrossroadsGenerator = () => (
  <GeneratorPage generator={dramaticCrossroadsGenerator} />
);

export default DramaticCrossroadsGenerator;

export { dramaticCrossroadsGenerator as generator };
