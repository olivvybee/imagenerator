import { GeneratorPage } from '../../components/GeneratorPage';
import { isThisAPigeonGenerator } from '../../generators/IsThisAPigeon';

const IsThisAPigeonGenerator = () => (
  <GeneratorPage generator={isThisAPigeonGenerator} />
);

export default IsThisAPigeonGenerator;

export { isThisAPigeonGenerator as generator };
