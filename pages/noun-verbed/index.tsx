import { GeneratorPage } from '../../components/GeneratorPage';
import { nounVerbedGenerator } from '../../generators';

const NounVerbedGenerator = () => (
  <GeneratorPage generator={nounVerbedGenerator} />
);

export { nounVerbedGenerator as generator };
export default NounVerbedGenerator;
