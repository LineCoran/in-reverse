'use client';

import { UiFlex, UiText } from '@common/ui';

import styles from './styles.module.css';
import { cn } from '@common/lib/cn';

type Props = {
  status: 'waiting' | 'ready';
  name: string;
  isMe: boolean;
  isOwner?: boolean;
};

export const Player = ({ status, name, isMe, isOwner = false }: Props) => {
  const circleCn = cn(styles.circle, {
    [styles.success]: status === 'ready',
    [styles.error]: status === 'waiting',
  });

  return (
    <UiFlex className={styles.container} justify="space-between" align="center">
      <UiFlex vertical gap={0}>
        <UiFlex align="center" gap={4}>
          <UiText.Text strong>{name}</UiText.Text>
          {isMe && (
            <UiText.Text type="success" strong>
              (Вы)
            </UiText.Text>
          )}
        </UiFlex>

        <UiText.Text type="secondary" style={{ fontSize: '0.7em' }}>
          {`Роль: ${isOwner ? 'Владец' : 'Гость'}`}
        </UiText.Text>
      </UiFlex>
      <div className={circleCn} />
    </UiFlex>
  );
};
