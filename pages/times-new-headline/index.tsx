import { GeneratorPage } from '../../components/GeneratorPage';
import { timesNewHeadlineGenerator } from '../../generators/TimesNewHeadline';

const TimesNewHeadlineGenerator = () => (
  <GeneratorPage generator={timesNewHeadlineGenerator} />
);

export default TimesNewHeadlineGenerator;

export { timesNewHeadlineGenerator as generator };
