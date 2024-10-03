import { GeneratorPage } from '../../components/GeneratorPage';
import { looksInsideGenerator } from '../../generators/LooksInside';

const LooksInsideGenerator = () => <GeneratorPage generator={looksInsideGenerator} />;

export { looksInsideGenerator as generator };
export default LooksInsideGenerator;
