exports.validateUser = (user) => {
    if (!user.name || !user.email) {
      throw new Error('User must have a name and email');
    }
  };
  