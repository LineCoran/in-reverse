export const config = {
  maxPlayersCount: 2,
  fakeOwnerId: '1',
  fakeUsers: [
    {
      name: 'Алексей',
      isOwner: true,
      id: '1',
      status: 'ready',
    },
    {
      name: 'Дмитрий',
      isOwner: false,
      id: '2',
      status: 'waiting',
    },
  ],
};
