import { Typography } from 'antd';
import { ReactNode } from 'react';

const { Paragraph, Title, Text } = Typography;

// Создаем базовый компонент
export const UiText = ({ children }: { children: ReactNode }) => {
  return <Paragraph>{children}</Paragraph>;
};

// Присваиваем подкомпоненты
UiText.Paragraph = Paragraph;
UiText.Title = Title;
UiText.Text = Text;

// Опционально: задаем displayName
UiText.Paragraph.displayName = 'UiText.Paragraph';
UiText.Title.displayName = 'UiText.Title';
UiText.Text.displayName = 'UiText.Text';