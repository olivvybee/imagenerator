import { ConfiguratorComponent } from '../types';
import { BlackAndWhiteConfig } from './types';

export const BlackAndWhiteConfigurator: ConfiguratorComponent<
  BlackAndWhiteConfig
> = ({ config, setConfig }) => <div>Percentage: {config.percentage}</div>;
