const initialState = {
  authUsers: [
    {
      id: "100",
      fullName: "Abhi",
      roles: "Board Resolution",
      Shareholding: "51%"
    },
    {
      id: "101",
      fullName: "Bhakta",
      roles: "Board Resolution",
      Shareholding: "11%"
    }
  ]
};

const authUsers = (state = initialState, action) => {
  return state;
};

export default authUsers;
