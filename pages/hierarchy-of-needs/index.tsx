import { GeneratorPage } from '../../components/GeneratorPage';
import { hierarchyOfNeedsGenerator } from '../../generators';

const HierarchyOfNeedsGenerator = () => (
  <GeneratorPage generator={hierarchyOfNeedsGenerator} />
);

export { hierarchyOfNeedsGenerator as generator };
export default HierarchyOfNeedsGenerator;
