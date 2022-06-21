import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x9e1b8ceC0B767f4387f38f4868698245b972DD3A"
);

export default instance;
