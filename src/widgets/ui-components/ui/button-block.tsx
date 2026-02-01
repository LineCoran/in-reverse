import { UiButton, UiFlex, UiText } from '@common/ui';
import type {
  ButtonColorType,
  ButtonVariantType,
} from 'antd/es/button/buttonHelpers';

type Props = {
  variant?: ButtonVariantType;
  color?: ButtonColorType;
};

export function ButtonBlock({ variant, color }: Props) {
  return (
    <UiFlex gap={20} align="center">
      <UiFlex vertical gap={2} style={{ minWidth: '140px' }}>
        <UiText.Paragraph>
          color=&rdquo;<UiText.Text strong>{color}</UiText.Text>&rdquo;
        </UiText.Paragraph>
        <UiText.Paragraph>
          variant=&rdquo;<UiText.Text strong>{variant}</UiText.Text>&rdquo;
        </UiText.Paragraph>
      </UiFlex>
      <UiButton color={color} variant={variant}>
        Кнопка
      </UiButton>
    </UiFlex>
  );
}
