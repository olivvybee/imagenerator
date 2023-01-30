import { TypedSetting, SettingType } from '../../types/SettingTypes';
import { ColourField } from '../ColourField';
import { DropdownField } from '../DropdownField';
import { ImageField } from '../ImageField';
import { SliderField } from '../SliderField';
import { StepperField } from '../StepperField';
import { TextField } from '../TextField/TextField';

interface SettingRendererProps {
  setting: TypedSetting;
  value: any;
  id: string;
  onChange: (newValue: any) => void;
  disabled?: boolean;
}

export const SettingRenderer: React.FC<SettingRendererProps> = ({
  setting,
  value,
  id,
  onChange,
  disabled,
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
          disabled={disabled}
        />
      );

    case SettingType.Colour:
      return (
        <ColourField
          onChange={onChange}
          value={value}
          presets={setting.params.presets}
          allowCustom={setting.params.allowCustom}
        />
      );

    case SettingType.Image:
      return <ImageField onChange={onChange} value={value} />;

    case SettingType.Slider:
      return (
        <SliderField
          onChange={onChange}
          value={value}
          min={setting.params.min}
          max={setting.params.max}
          step={setting.params.step}
          presets={setting.params.presets}
        />
      );

    case SettingType.Dropdown:
      return (
        <DropdownField
          onChange={onChange}
          value={value}
          options={setting.params.options}
        />
      );

    case SettingType.Stepper:
      return (
        <StepperField
          onChange={onChange}
          value={value}
          options={setting.params.options}
          allowWrapping={setting.params.allowWrapping}
          renderLabel={setting.params.renderLabel}
        />
      );
  }

  return <div>Unimplemented setting: {SettingType[setting.type]}</div>;
};
