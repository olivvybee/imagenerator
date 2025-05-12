import { GeneratorPage } from '../../components/GeneratorPage';
import { notWhatImCalledGenerator } from '../../generators/NotWhatImCalled';

const NotWhatImCalledGenerator = () => <GeneratorPage generator={notWhatImCalledGenerator} />;

export { notWhatImCalledGenerator as generator };
export default NotWhatImCalledGenerator;
