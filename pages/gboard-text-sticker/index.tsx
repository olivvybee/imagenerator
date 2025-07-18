import { GeneratorPage } from '../../components/GeneratorPage';
import { gboardTextStickerGenerator } from '../../generators/GboardTextSticker';

const GboardTextStickerGenerator = () => <GeneratorPage generator={gboardTextStickerGenerator} />;

export { gboardTextStickerGenerator as generator };
export default GboardTextStickerGenerator;
