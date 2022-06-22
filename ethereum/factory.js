import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xa7259790574453a9ABDA5D66FD6933BBf59Ee15D"
);

export default instance;
