import { GeneratorPage } from '../../components/GeneratorPage';
import { esrbRatingGenerator } from '../../generators/ESRBRating';

const ESRBRatingGenerator = () => <GeneratorPage generator={esrbRatingGenerator} />;

export { esrbRatingGenerator as generator };
export default ESRBRatingGenerator;
