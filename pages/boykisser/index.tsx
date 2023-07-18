import { GeneratorPage } from '../../components/GeneratorPage';
import { boykisserGenerator } from '../../generators/Boykisser';

const BoykisserGenerator = () => (
  <GeneratorPage generator={boykisserGenerator} />
);

export default BoykisserGenerator;

export { boykisserGenerator as generator };
