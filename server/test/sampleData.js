const sampleData = {
    validUser1: {
        firstName: 'john',
        lastName: 'doe',
      email: 'john.doe@gmail.com',
      password: 'Some2password',
    },
    validUser2: {
        firstName: 'john',
        lastName: 'doe',
      email: 'john.doe2@gmail.com',
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
    anotherValidtoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbWUyQGV4YW1wbGUuY29tIiwiaWF0IjoxNTc5NDIzNzE2LCJleHAiOjE2MTA5ODEzMTZ9.mYgKiQ6EFUznkuix9blVZiUaEDl09oDL061snJfx7_s',
    invalidEntryId: 'id',
    nonExistentId: 0
}
  export default sampleData;
  