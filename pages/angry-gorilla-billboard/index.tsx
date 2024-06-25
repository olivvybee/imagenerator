import { GeneratorPage } from '../../components/GeneratorPage';
import { angryGorillaBillboardGenerator } from '../../generators/AngryGorillaBillboard';

const AngryGorillaBillboardGenerator = () => <GeneratorPage generator={angryGorillaBillboardGenerator} />;

export { angryGorillaBillboardGenerator as generator };
export default AngryGorillaBillboardGenerator;
