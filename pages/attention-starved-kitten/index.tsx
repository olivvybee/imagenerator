import { GeneratorPage } from '../../components/GeneratorPage';
import { attentionStarvedKittenGenerator } from '../../generators/AttentionStarvedKitten';

const AttentionStarvedKittenGenerator = () => <GeneratorPage generator={attentionStarvedKittenGenerator} />;

export { attentionStarvedKittenGenerator as generator };
export default AttentionStarvedKittenGenerator;
