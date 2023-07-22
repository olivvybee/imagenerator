import { GeneratorPage } from '../../components/GeneratorPage';
import { notKiddingGenerator } from '../../generators/NotKidding';

const NotKiddingGenerator = () => (
  <GeneratorPage generator={notKiddingGenerator} />
);

export default NotKiddingGenerator;

export { notKiddingGenerator as generator };
