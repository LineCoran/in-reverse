'use client';
import { Section } from '@common/ui';

import { AudioOutlined } from '@ant-design/icons';
import { ActionForm, Notice } from './ui';

export const WelcomeWidget = () => {
  return (
    <Section
      text="Играй и веселись вместе с друзьями!"
      title="Добро пожаловать в InReverse!"
      icon={<AudioOutlined />}
    >
      <ActionForm />
      <Notice />
    </Section>
  );
};
