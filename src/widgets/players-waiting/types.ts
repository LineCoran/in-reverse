export type Item = {
  id: string;
  name: string;
  isOwner: boolean;
  status: 'waiting' | 'ready';
};