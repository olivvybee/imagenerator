import { GeneratorPage } from '../../components/GeneratorPage';
import { whatAWeekGenerator } from '../../generators/WhatAWeek';

const WhatAWeekGenerator = () => <GeneratorPage generator={whatAWeekGenerator} />;

export { whatAWeekGenerator as generator };
export default WhatAWeekGenerator;
