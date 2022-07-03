import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from '../main/Main';
import ReactDOM from 'react-dom';


function Tab() {
    const handleSelect = function(eventKey: string | null, e: React.SyntheticEvent<unknown>){
  
        const mainComponent = <Main mode={eventKey} />
        ReactDOM.render(
            mainComponent,
            document.getElementById("main")
        )
    };

    return (
     
        <Nav variant="pills" activeKey="1" onSelect={handleSelect} className="sidebar">
        {/* <Nav.Item>
          <Nav.Link eventKey="calendar" href="#/home">
          calendar
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="user" title="Item">
            USERS
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" disabled>
            NavLink 3 content
          </Nav.Link>
        </Nav.Item> */}
        <Nav.Item>
            <Nav.Link eventKey="ingest" href="#/home">
              인제스트
            </Nav.Link>
        </Nav.Item>
        <NavDropdown title="설정" id="nav-dropdown">
            {/*<NavDropdown.Item eventKey="ingest">인제스트</NavDropdown.Item>*/}
          <NavDropdown.Item eventKey="metadata">메타데이터 관리</NavDropdown.Item>
          <NavDropdown.Item eventKey="storage">스토리지 관리</NavDropdown.Item>
          <NavDropdown.Item eventKey="code">시스템 코드 관리</NavDropdown.Item>
          {/* <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item> */}
        </NavDropdown>
      </Nav>
        
    )
}

export default Tab;