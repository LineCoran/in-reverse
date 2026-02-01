import { useInput } from '@common/hooks';
import { UiButton, UiInput } from '@common/ui/index';
import type { ButtonColorType } from 'antd/es/button/buttonHelpers';

type Props = {
  onSubmit: (value: string) => void;
  buttonText: string;
  placeholder: string;
  icon?: React.ReactNode;
  buttonColor?: ButtonColorType;
};

export const InputAction = ({
  onSubmit,
  buttonText,
  placeholder,
  icon,
  buttonColor = 'default',
}: Props) => {
  const { value, isError, onChange, validate } = useInput();

  const onHandleClick = () => {
    const { error } = validate();
    if (error) {
      return;
    }

    onSubmit(value);
  };

  return (
    <>
      <UiInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size="large"
        status={isError ? 'error' : undefined}
      />
      <UiButton
        block
        color={buttonColor}
        size="large"
        variant="solid"
        icon={icon}
        onClick={onHandleClick}
      >
        {buttonText}
      </UiButton>
    </>
  );
};
