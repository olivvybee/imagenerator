import { Setting, SettingType } from '../../types/SettingTypes';
import { TextField } from '../TextField/TextField';

interface SettingRendererProps {
  setting: Setting;
  value: any;
  id: string;
  onChange: (newValue: any) => void;
}

export const SettingRenderer: React.FC<SettingRendererProps> = ({
  setting,
  value,
  id,
  onChange,
}) => {
  switch (setting.type) {
    case SettingType.Text:
      return (
        <TextField
          id={id}
          onChange={onChange}
          autoComplete="off"
          autoCapitalize="off"
          value={value}
          placeholder={setting.params.placeholder}
        />
      );
  }

  return <div>Unimplemented setting: {SettingType[setting.type]}</div>;
};
