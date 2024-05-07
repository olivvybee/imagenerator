import { GeneratorPage } from '../../components/GeneratorPage';
import { questioningGooseGenerator } from '../../generators/QuestioningGoose';

const QuestioningGooseGenerator = () => <GeneratorPage generator={questioningGooseGenerator} />;

export { questioningGooseGenerator as generator };
export default QuestioningGooseGenerator;
