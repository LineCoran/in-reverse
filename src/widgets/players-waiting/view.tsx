'use client';
import { Section, UiFlex } from '@common/ui';
import { TeamOutlined } from '@ant-design/icons';
import { config } from './config';
import { type Item } from './types';
import { Copy, List } from './ui/';
import { useEffect, useState } from 'react';

type Props = {
  id: string;
};

export const View = ({ id }: Props) => {
  const [list, setList] = useState<Item[]>([config.fakeUsers[0]] as Item[]);

  // :TODO Удалить когда бек отдаст ручки
  useEffect(() => {
    setTimeout(() => {
      setList((prev) => [...prev, config.fakeUsers[1]] as Item[]);
    }, 1000);
  }, []);

  return (
    <Section
      title="Комната ожидания"
      text="Ожиданием присоединение игроков"
      icon={<TeamOutlined />}
    >
      <UiFlex vertical gap={4}>
        <Copy value={id} />
        <List list={list} />
      </UiFlex>
    </Section>
  );
};
