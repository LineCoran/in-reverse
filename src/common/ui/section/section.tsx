import styles from './styles.module.css';
import { UiFlex, UiText } from '@common/ui';

type Props = {
  title: string;
  text: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
};

export const Section = ({ title, text, icon, children }: Props) => {
  return (
    <UiFlex className={styles.container} gap={32} vertical>
      <UiFlex vertical gap={12} justify="center" align="center">
        <div className={styles.icon}>{icon}</div>
        <UiFlex vertical gap={4} justify="center" align="center">
          <UiText.Title level={4}>{title}</UiText.Title>
          <UiText.Paragraph>{text}</UiText.Paragraph>
        </UiFlex>
      </UiFlex>

      {children}
    </UiFlex>
  );
};
