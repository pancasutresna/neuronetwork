import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            connected: false
        };
    }
    toggle() {

        this.setState({
            isOpen: !this.state.isOpen
        });
        //console.log('test');
        this.logconsole('test');
    }

    logconsole(msg) {
        console.log(msg);
        let the_msg = {
          name: 'channel add',
          data: {
            id: 'lalala yeyeye',
            name: 'dmamamam'
          }
        }
        this.ws.send(JSON.stringify(the_msg));
    }

    componentDidMount() {
      let ws = this.ws = new WebSocket('ws://echo.websocket.org');
      ws.onmessage = this.message.bind(this);
      ws.onopen = this.open.bind(this);
      ws.onclose = this.close.bind(this);
    }

    message(e) {
      const event = JSON.parse(e.data);
      if (event.name === 'channel add') {
        this.logconsole(event.data);
      }
    }

    open() {
      this.setState({connected: true});
    }

    close() {
      this.setState({connected: false});
    }

    render() {
        return (
            <div>
                <Navbar color="inverse" light expand="md">
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Welcome to React</h1>
                                <p>
                                    <Button
                                        tag="a"
                                        color="success"
                                        size="large"
                                        href="http://reactstrap.github.io"
                                        target="_blank"
                                        onClick={this.toggle}
                                    >
                                        View Reactstrap Docs
                                    </Button>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default App;