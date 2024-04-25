import { GeneratorPage } from '../../components/GeneratorPage';
import { nothingNewThereGenerator } from '../../generators/NothingNewThere';

const NothingNewThereGenerator = () => <GeneratorPage generator={nothingNewThereGenerator} />;

export { nothingNewThereGenerator as generator };
export default NothingNewThereGenerator;
