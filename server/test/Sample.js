const sample = {
  validUser: {
    email: 'newuser@gmail.com',
    password: 'hispassword',
  },
  anotherValidUser: {
    firstName: 'hisfirstname',
    lastName: 'hislastname',
    email: 'newUser@gmail.com',
    password: 'hispassword',
  },
  invalidUser: {
    email: 'name',
    password: null,
  },
  anotherValidUser2: {
    firstName: 'hisfirstname',
    lastName: 'hislastname',
    email: 'newuser@gmail.com',
    password: 'nopassword',
  },
  incorrectUser2: {
    email: 'newuse@gmail.com',
    password: 'other',
  },

  validEntry: {
    title: 'this is a title',
    description: 'this is a description',
    is_favorite: false,
  },
  secondValidEntry: {
    title: 'second this is a title',
    description: 'second looks like a description',
    is_favorite: true,
  },
  invalidEntry: {
    title: '5',
    description: 'looks like a description',
    is_favorite: 5, // isFavorite should be boolean
  },
  incompleteValidEntry: {
    title: 'this is a title',
    description: 'Lovely description',
  },
  incompleteInvalidEntry: {
    is_favorite: 'true',
  }
}

export default sample;