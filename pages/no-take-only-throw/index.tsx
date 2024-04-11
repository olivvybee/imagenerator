import { GeneratorPage } from '../../components/GeneratorPage';
import { noTakeOnlyThrowGenerator } from '../../generators/NoTakeOnlyThrow';

const NoTakeOnlyThrowGenerator = () => <GeneratorPage generator={noTakeOnlyThrowGenerator} />;

export { noTakeOnlyThrowGenerator as generator };
export default NoTakeOnlyThrowGenerator;
