import { Typography } from 'antd';
import { type ReactNode } from 'react';

const { Paragraph, Title, Text } = Typography;

export const UiText = ({ children }: { children: ReactNode }) => {
  return <Paragraph>{children}</Paragraph>;
};

UiText.Paragraph = Paragraph;
UiText.Title = Title;
UiText.Text = Text;

UiText.Paragraph.displayName = 'UiText.Paragraph';
UiText.Title.displayName = 'UiText.Title';
UiText.Text.displayName = 'UiText.Text';
