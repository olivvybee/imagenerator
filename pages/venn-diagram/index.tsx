import { GeneratorPage } from '../../components/GeneratorPage';
import { vennDiagramGenerator } from '../../generators/VennDiagram';

const VennDiagramGenerator = () => <GeneratorPage generator={vennDiagramGenerator} />;

export { vennDiagramGenerator as generator };
export default VennDiagramGenerator;
