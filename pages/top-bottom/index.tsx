import { GeneratorPage } from '../../components/GeneratorPage';
import { topBottomTextGenerator } from '../../generators';

const TopBottomTextGenerator = () => (
  <GeneratorPage generator={topBottomTextGenerator} />
);

export { topBottomTextGenerator as generator };
export default TopBottomTextGenerator;
