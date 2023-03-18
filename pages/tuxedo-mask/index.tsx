import { GeneratorPage } from '../../components/GeneratorPage';
import { tuxedoMaskGenerator } from '../../generators';

const TuxedoMaskGenerator = () => (
  <GeneratorPage generator={tuxedoMaskGenerator} />
);

export { tuxedoMaskGenerator as generator };
export default TuxedoMaskGenerator;
