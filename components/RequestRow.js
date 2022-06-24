import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";

import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

class RequestRow extends Component {
  state = {
    isApproving: false,
    isFinalizing: false,
  };

  onApprove = async () => {
    try {
      this.setState({ isApproving: true });

      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .approveRequest(this.props.id)
        .send({ from: accounts[0] });
    } catch (ex) {
    } finally {
      this.setState({ isApproving: false });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    }
  };

  onFinalize = async () => {
    try {
      this.setState({ isFinalizing: true });

      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .finalizeRequest(this.props.id)
        .send({ from: accounts[0] });
    } catch (ex) {
    } finally {
      this.setState({ isFinalizing: false });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    }
  };

  render() {
    const { Row, Cell } = Table;
    const {
      id,
      request: { description, value, recipient, approvalCount, complete },
      approversCount,
    } = this.props;
    const readyToFinalize = approvalCount > approversCount / 2;

    return (
      <Row disabled={complete} positive={readyToFinalize && !complete}>
        <Cell>{id + 1}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>
          {approvalCount} / {approversCount}
        </Cell>
        <Cell>
          {complete ? null : (
            <Button
              color="green"
              basic
              loading={this.state.isApproving}
              onClick={this.onApprove}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {complete ? null : (
            <Button
              color="teal"
              basic
              loading={this.state.isFinalizing}
              onClick={this.onFinalize}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
