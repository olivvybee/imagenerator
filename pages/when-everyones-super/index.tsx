import { GeneratorPage } from '../../components/GeneratorPage';
import { whenEveryonesSuperGenerator } from '../../generators/WhenEveryonesSuper';

const WhenEveryonesSuperGenerator = () => <GeneratorPage generator={whenEveryonesSuperGenerator} />;

export { whenEveryonesSuperGenerator as generator };
export default WhenEveryonesSuperGenerator;
