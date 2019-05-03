const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const Usertype = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: Usertype,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
  },
});

module.exports = RootQueryType;
