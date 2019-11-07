const sampleData = {
    validUser1: {
        firstName: 'john',
        lastName: 'doe',
      email: 'john.doe@gmail.com',
      password: 'Some2password',
    },
    validUser: {
        email: 'john.doe@gmail.com',
      password: 'Some2password'
    },
    invalidUser: {
      email: 'name',
      password: null,
    },
    incorrectUser: {
      email: 'john.doe3@gmail.com',
      password: 'nopassword',
    },
    incorrectUser2: {
      email: 'john.doe@gmail.com',
      password: 'nopassword',
    },
    invalidToken: 'invalid.token',
    validEntry: {
      title: 'Cool Title',
      description: 'Awesome description',
      isfavorite: false,
    },
    anotherValidEntry: {
      title: 'Another Cool Title',
      description: 'Another Awesome description',
      isfavorite: true,
    },
    invalidEntry: {
      title: '5',
      description: 'Awesome description',
      isfavorite: 5,
    },
    anotherValidEntry: {
      title: 'Cool Title',
      description: 'Lovely description',
      isfavorite: true
    },
    incompleteInvalidEntry: {
      isfavorite: 'true',
    },
    anotherValidtoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRva2VuQGdtYWlsLmNvbSIsImlhdCI6MTU3MzA3MTg0NSwiZXhwIjoxNTczMjQ0NjQ1fQ.d-eUCfx6yTT9mFBPDvuJvT8jhK4hFT84VLKn4Qa-xZ4',
    invalidEntryId: 'id',
    nonExistentId: 0
}
  export default sampleData;
  