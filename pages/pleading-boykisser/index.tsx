import { GeneratorPage } from '../../components/GeneratorPage';
import { pleadingBoykisserGenerator } from '../../generators/PleadingBoykisser';

const PleadingBoykisserGenerator = () => <GeneratorPage generator={pleadingBoykisserGenerator} />;

export { pleadingBoykisserGenerator as generator };
export default PleadingBoykisserGenerator;
