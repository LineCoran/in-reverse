'use client';
import { UiText, UiFlex, UiButton } from '@common/ui';
import { AudioRecorderView } from '@features/audio-record';

export const WelcomeWidget = () => {

  return (
    <UiFlex vertical>
      <AudioRecorderView />
      <UiText.Title level={2}>Добро пожаловать в InReverse!</UiText.Title>
      <UiText.Paragraph>Здесь ты сможешь поиграть</UiText.Paragraph>
      <UiFlex vertical gap={8}>
        <UiButton href='create-room'>
          Новая игра
        </UiButton>
        <UiButton>
          Подключиться
        </UiButton>
      </UiFlex>
    </UiFlex>
  );
};
