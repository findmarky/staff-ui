import { FunctionComponent } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { chunk } from "lodash";
import { v4 as uuidv4 } from "uuid";

interface Role {
  id: String;
  name: String;
  description: String;
}

type RoleCardPros = {
  role: Role;
};

export const RoleCard: FunctionComponent<RoleCardPros> = ({ role }) => {
  const onCardClick = () => {
    console.log(`Card Clicked. Role: ${role.name}`);
  };

  return (
    <Card bg="Light" text={"dark"} onClick={onCardClick}>
      <Card.Header>{role.name}</Card.Header>
      <Card.Body>
        <Card.Text>
          {role.description}
        </Card.Text>
        <Button variant="primary">Something</Button>
      </Card.Body>
    </Card>
  );
};

const NumberOfRolesInARow = 3;

export const Roles: FunctionComponent = () => {

  const roles: Role[] = [
    { id: "101", name: "Controller", description: "In a corporate environment, a controller supervises all other accounting staff and usually reports to a chief financial officer or director of finance." },
    { id: "102", name: "Bookkeeper", description: "The person in an organisation who is employed to perform bookkeeping functions is usually called the bookkeeper (or book-keeper)." },
    { id: "103", name: "Accountant", description: "Accountants are professionals who record, summarize, evaluate and report financial transactions for organizations." },
    { id: "104", name: "Staff Accountant", description: "A mid-level accounting position between junior accountant and senior accountant. At public accounting firms, staff accountant may be an entry-level position." },
    { id: "105", name: "Accounting Clerk", description: "Accounting clerks are typically lower-level accounting professionals who are responsible for creating, reviewing and maintaining accounting records as well as keeping a record of business transactions." },
    { id: "106", name: "Accounting Manager", description: "A mid to upper-level manager and accounting professional who oversees staff accountants and/or accounting supervisors or junior accountants. Generally manages a team of Accountants." },
    { id: "107", name: "Auditor", description: "An auditor is responsible for analyzing an organization's reports and records, and they aid firms by ensuring public records are kept accurate and confirming the proper payment of taxes." },
    { id: "108", name: "Tax Accountant", description: "A Tax Accountant is responsible for ensuring that businesses and individuals are in compliance with tax laws. Usually reporting financial tax information to external tax bodies." },
  ];

  const rowsOfRoles: Role[][] = chunk(roles, NumberOfRolesInARow);

  return (
    <Container>
      {rowsOfRoles.map((rowOfRoles: Role[], rowIndex: number) => (
        <Row key={rowIndex} className="mt-4">
          {rowOfRoles.map((role: Role) => (
            <Col key={uuidv4()} sm={4}>
              <RoleCard key={role.id.toString()} role={role}></RoleCard>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};
