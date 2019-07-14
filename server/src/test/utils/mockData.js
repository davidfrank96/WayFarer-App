import hashedPassword from '../../helpers/hashpassword';

export default {
  signup: {
    validClientDetails: {
      first_name: "John",
      last_name: "Doe",
      email: "john@gmail.com",
      password: hashedPassword("password", 10),
      isAdmin: false,
      createdAt: new Date(),
      modifiedAt: null
    },
    validStaffDetails: {
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
  Signin: {
    validSigninDetails: {
      email: "frank@gmail.com",
      password: "password"
    },
    emptySigninDetails: {
      email: "frank@gmail.com",
      password: ""
    },
    invalidSigninDetails: {
      email: "wrong@gmail.com",
      password: "password"
    }
  },
  Trip: {
    validTripDetails: {
      bus_id: "1",
      trip_id: 1,
      origin: "abuja",
      destination: "lagos",
      fare: 4000
    },
    emptyTripDetails: {
      fare: 1000
    }
  }
};
