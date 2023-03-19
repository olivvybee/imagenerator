import { GeneratorPage } from '../../components/GeneratorPage';
import { theyLiveGenerator } from '../../generators/TheyLive';

const TheyLiveGenerator = () => <GeneratorPage generator={theyLiveGenerator} />;

export { theyLiveGenerator as generator };
export default TheyLiveGenerator;
