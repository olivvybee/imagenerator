import { GeneratorPage } from '../../components/GeneratorPage';
import { nowThatsWhatICallGenerator } from '../../generators/NowThatsWhatICall';

const NowThatsWhatICallGenerator = () => (
  <GeneratorPage generator={nowThatsWhatICallGenerator} />
);

export default NowThatsWhatICallGenerator;

export { nowThatsWhatICallGenerator as generator };
