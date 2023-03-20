import { GeneratorPage } from '../../components/GeneratorPage';
import { yakuzaGenerator } from '../../generators';

const YakuzaGenerator = () => <GeneratorPage generator={yakuzaGenerator} />;

export { yakuzaGenerator as generator };
export default YakuzaGenerator;
