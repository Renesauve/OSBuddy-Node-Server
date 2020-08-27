module.exports = {
  Query: {
    items: (_, __, {dataSources}) => dataSources.osBuddy.ItemsFinder(),
  },
};
