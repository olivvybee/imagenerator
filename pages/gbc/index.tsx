import { GeneratorPage } from '../../components/GeneratorPage';
import { gameboyCameraGenerator } from '../../generators';

const GameBoyCameraGenerator = () => (
  <GeneratorPage generator={gameboyCameraGenerator} />
);

export { gameboyCameraGenerator as generator };
export default GameBoyCameraGenerator;
