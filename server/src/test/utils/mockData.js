import hashedPassword from '../../helpers/hashpassword';

export default {
  signup: {
    validClientDetails: {
      first_name: "Frank",
      last_name: "Frank",
      email: "frank@gmail.com",
      password: hashedPassword("password", 10),
      isAdmin: true,
      createdAt: new Date(),
      modifiedAt: null
    },
    invalidUserDetails: {
      first_name: "Ashley",
      password: hashedPassword("password", 10),
      isAdmin: false,
      createdAt: new Date(),
      modifiedAt: null
    }
  },
  login: {
    validLoginDetails: {
      email: "frank@gmail.com",
      password: "password"
    },
    emptyLoginDetails: {
      email: "frank@gmail.com",
      password: ""
    },
    invalidLoginDetails: {
      email: "wrong@gmail.com",
      password: "password"
    }
  },
  Trip: {
    validTripDetails: {
      bus_id: "3",
      trip_id: 4,
      origin:"abuja",
      destination: "lagos",
      fare: 4000
      
    },
    emptyTripDetails: {
      fare: 1000
    }
  }
};
