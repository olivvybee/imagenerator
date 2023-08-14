import { GeneratorPage } from '../../components/GeneratorPage';
import { tradeOfferGenerator } from '../../generators/TradeOffer';

const TradeOfferGenerator = () => (
  <GeneratorPage generator={tradeOfferGenerator} />
);

export default TradeOfferGenerator;

export { tradeOfferGenerator as generator };
