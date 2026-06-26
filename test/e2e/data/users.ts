export const testUsers = {
  validUser: {
    email: 'valva+33@cchs.com',
    password: 'Accion@2024',
    fullName: 'Test User',
  },
  invalidUser: {
    email: 'invalid@cchs.com',
    password: 'WrongPassword123',
  },
  emptyCredentials: {
    email: '',
    password: '',
  },
};

export type TestUser = typeof testUsers[keyof typeof testUsers];
