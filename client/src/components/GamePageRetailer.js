import React from 'react'
import {Tabs, Tab} from "react-bootstrap"
import HTable from './HistoryTable'
import { SubHeading, SupplyChain, Status, Item, Info, Data, FormInput, FormButton } from './Elements/GamePageElements'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default class GamePageRetailer extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        order: {
          order: props.order
        }
      }
    }
 
    // started implementing game logic here, not complete yet
    handleOrderChanged(event) {
      var order = this.state.order
      order.order  = event.target.value
  
      this.setState({ order: order })
      this.setState({ [event.target.name]: event.target.value });
      order.push(this.state.order)
    }

    handleButtonClicked() {
      console.log(this.state.order);
    }

    render() {
    return (
        <div>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Current Week">
                    <SubHeading>Game Screen for Retailer</SubHeading>
                    <Container style={{border: "1px solid #cecece"}}>
                        <Row style={{padding: "10px 0px"}}>
                            <Col style={{textAlign: "center"}}>Demand from Customer: <b>0</b></Col>
                            <Col style={{textAlign: "center"}}>Beginning Inventory: <b>15</b></Col>
                        </Row>
                        <Row style={{padding: "10px 0px"}}>
                            <Col style={{textAlign: "center"}}>On Backorder: <Status ordered={false} bold={true}>0</Status> </Col>
                            <Col style={{textAlign: "center"}}>Incoming Shipment: <Status ordered={true} bold={true}>0</Status> </Col>
                        </Row>
                        <Row>
                            <Col style={{textAlign: "center"}}>- - - - - - - - - -</Col>
                            <Col style={{textAlign: "center"}}>- - - - - - - - - -</Col>
                        </Row>
                        <Row style={{padding: "10px 0px"}}>
                            <Col style={{textAlign: "center"}}>Total requirements: <Data blue={true}>0</Data></Col>
                            <Col style={{textAlign: "center"}}>Total available: <Data blue={true}>15</Data></Col>
                        </Row>
                    </Container>
                    <Info>Units Shipped to Customer this week: <Data blue={true}>0</Data></Info>
                    <Info>Ending Inventory: <Status ordered={true}>15</Status></Info>
                    <form> 
                        <label>
                            Enter amount of beers to purchase from Wholesaler:
                            <FormInput type='text' required/>
                        </label>
                        <FormButton type='submit' id='order' value={this.state.order} onChange={this.handleOrderChanged.bind(this)}>Place Order</FormButton>
                    </form>
                </Tab>
                <Tab eventKey="history" title="Demand History">
                    <SubHeading> A brief overview of your game history </SubHeading> 
                    <HTable />
                </Tab>
                <Tab eventKey="status" title="Status of Supply Chain">
                    <SubHeading>Week 4</SubHeading>
                    When all players have completed the order for the current week, the player will automatically receive a link to proceed to next week.
                    <SupplyChain>Retailer: <Status ordered={false}>Has not Ordered</Status> </SupplyChain>
                    <SupplyChain>Customer: <Status ordered={true}>Has Ordered</Status> </SupplyChain>
                </Tab>
                <Tab eventKey="graphs" title="View Plot and Settings">
                    <SubHeading>Current Settings</SubHeading>
                    <Item>Holding cost: <b>0.5</b></Item>
                    <Item>Backorder cost: <b>1</b></Item>
                    <Item>Downstream Player: <b>Distributor</b></Item>
                    <Item>Upstream Player: <b>Brewery</b></Item>
                    <Item>Shipping Delay:</Item>
                    <Item indent={true}>Factory to Distributor : <b>2 weeks</b></Item>
                    <Item indent={true}>Brewery to Factory: <b>1 week</b></Item>
                    <Item>Information Delay:</Item>
                    <Item indent={true}>Distributor to Factory: <b>2 weeks</b></Item>
                    <Item indent={true}>Factory to Brewery: <b>1 week</b></Item>
                    <SubHeading>Plots</SubHeading>
                    <Button variant="primary" size="sm"> Demand Plot </Button>{' '}
                    <Button variant="primary" size="sm"> Order Plot </Button>{' '}
                    <Button variant="primary" size="sm"> Inventory/Backorder Plot </Button>{' '}
                    <Button variant="primary" size="sm"> Plot All </Button>
                </Tab>
            </Tabs>
        </div>
    )
}

}