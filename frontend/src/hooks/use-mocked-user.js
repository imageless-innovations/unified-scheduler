export const useMockedUser = () => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  return {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/user.png',
    name: 'Michael Bagget',
    email: 'michael@gmail.com'
  };
};
