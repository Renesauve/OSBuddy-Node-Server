const {RESTDataSource} = require("apollo-datasource-rest");

class osBuddy extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://storage.googleapis.com/osb-exchange/summary.json";
  }
  async getAllItems() {
    const response = await this.get("items");
    return Array.isArray(response)
      ? response.map((items) => this.ItemsFinder(items))
      : [];
  }

  async ItemsFinder(items) {
    return {
      id: items.id,
      itemId: items.itemId,
      name: items.name,
      members: items.members,
      sp: items.sp,
      buyAverage: items.buyAverage,
      buyQuantity: items.buyQuantity,
      sellAverage: items.sellAverage,
      sellQuantity: items.sellQuantity,
      overallAverage: items.overallAverage,
      overallQuantity: items.overallQuantity,
    };
  }
  async getItemsById({ItemsId}) {
    const response = await this.get("Items", {ItemId: ItemsId});
    return this.ItemsFinder(response[0]);
  }

  getItemsesByIds({ItemsIds}) {
    return Promise.all(ItemsIds.map((ItemsId) => this.getItemsById({ItemsId})));
  }
}

module.exports = osBuddy;
