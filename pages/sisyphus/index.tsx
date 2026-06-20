import { GeneratorPage } from '../../components/GeneratorPage';
import { sisyphusGenerator } from '../../generators/Sisyphus';

const SisyphusGenerator = () => <GeneratorPage generator={sisyphusGenerator} />;

export { sisyphusGenerator as generator };
export default SisyphusGenerator;
