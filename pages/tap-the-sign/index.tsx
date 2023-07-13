import { GeneratorPage } from '../../components/GeneratorPage';
import { tapTheSignGenerator } from '../../generators/TapTheSign';

const TapTheSignGenerator = () => (
  <GeneratorPage generator={tapTheSignGenerator} />
);

export default TapTheSignGenerator;

export { tapTheSignGenerator as generator };
