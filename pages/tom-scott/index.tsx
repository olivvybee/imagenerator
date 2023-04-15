import { GeneratorPage } from '../../components/GeneratorPage';
import { tomScottGenerator } from '../../generators';

const TomScottGenerator = () => <GeneratorPage generator={tomScottGenerator} />;

export { tomScottGenerator as generator };
export default TomScottGenerator;
