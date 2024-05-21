import { GeneratorPage } from '../../components/GeneratorPage';
import { closedCaptionsGenerator } from '../../generators/ClosedCaptions';

const ClosedCaptionsGenerator = () => <GeneratorPage generator={closedCaptionsGenerator} />;

export { closedCaptionsGenerator as generator };
export default ClosedCaptionsGenerator;
