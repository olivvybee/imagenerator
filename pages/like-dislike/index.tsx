import { GeneratorPage } from '../../components/GeneratorPage';
import { likeDislikeGenerator } from '../../generators/LikeDislike';

const LikeDislikeGenerator = () => <GeneratorPage generator={likeDislikeGenerator} />;

export { likeDislikeGenerator as generator };
export default LikeDislikeGenerator;
