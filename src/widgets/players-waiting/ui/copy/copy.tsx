import { UiButton, UiFlex, UiInput, UiText } from '@common/ui';

type Props = {
  value: string;
  title?: string;
  description?: string;
};

export const Copy = ({
  value,
  title = 'Room Code',
  description = 'Поделитесь этим кодом со своим другом, чтобы он тоже мог присоединиться.',
}: Props) => {
  const hadleCopyClick = () => {
    void navigator.clipboard.writeText(value);
  };

  return (
    <>
      <UiText.Text strong>{title}</UiText.Text>
      <UiFlex align="center" gap={8}>
        <UiInput value={value} />
        <UiButton onClick={hadleCopyClick}>Скопировать</UiButton>
      </UiFlex>
      <UiText.Text type="secondary" style={{ fontSize: '0.7em' }}>
        {description}
      </UiText.Text>
    </>
  );
};
