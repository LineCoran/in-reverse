import { UiFlex, UiText } from '@common/ui';
import styles from './styles.module.css';

export const Notice = () => {
  return (
    <UiFlex className={styles.container} vertical gap={4}>
      <UiText.Title level={5}>Как играть?</UiText.Title>
      <UiFlex vertical gap={4}>
        <UiText.Text>1. Player 1 records a song (or hums it)</UiText.Text>
        <UiText.Text>2. The audio is split and played backwards</UiText.Text>
        <UiText.Text>
          3. Player 2 listens and imitates each fragment
        </UiText.Text>
        <UiText.Text>4. Player 2 hears their stitched recording</UiText.Text>
        <UiText.Text>5. Player 2 tries to guess the original song!</UiText.Text>
      </UiFlex>
    </UiFlex>
  );
};
