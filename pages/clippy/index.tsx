import { GeneratorPage } from '../../components/GeneratorPage';
import { clippyGenerator } from '../../generators/Clippy';

const ClippyGenerator = () => <GeneratorPage generator={clippyGenerator} />;

export default ClippyGenerator;

export { clippyGenerator as generator };
