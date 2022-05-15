import { FunctionComponent } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { chunk } from "lodash"
import { v4 as uuidv4 } from "uuid";

interface Role {
  id: String;
  name: String;
}

type RoleCardPros = {
  role: Role;
}

export const RoleCard: FunctionComponent<RoleCardPros> = ({ role }) => {
  const onCardClick = () => {
    console.log(`Card Clicked. Role: ${role.name}`);
  };

  return (
    <Card bg="Light" text={'dark'} onClick={onCardClick}>
      <Card.Header>{role.name}</Card.Header>
      <Card.Body>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Something</Button>
      </Card.Body>
    </Card>
  );
};

const NumberOfRolesInARow = 3;

export const Roles: FunctionComponent = () => {

  const roles = [
    { name: 'Controller', id: "101" },
    { name: 'Bookkeeper', id: "102" },
    { name: 'Accountant', id: "103" },
    { name: 'Staff Accountant', id: "104" },
    { name: 'Accounting Clerk', id: "105" },
    { name: 'Accounting Manager', id: "106" },
    { name: 'Auditor', id: "107" },
    { name: 'Tax Accountant', id: "108" }];

  const rowsOfRoles = chunk(roles, NumberOfRolesInARow);

  return (
    <Container>
      {rowsOfRoles.map((rowOfRoles) => (
        <Row key={uuidv4()} className="mt-4">
          {rowOfRoles.map((role) => (
            <Col key={uuidv4()} sm={4}>
              <RoleCard key={role.id} role={role}></RoleCard>
            </Col>
          ))}
        </Row>
      ))}
    </Container >
  );
};
