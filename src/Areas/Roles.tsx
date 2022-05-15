import { FunctionComponent } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { chunk } from "lodash"

type RoleCardPros = {
  name: String;
}

export const RoleCard: FunctionComponent<RoleCardPros> = ({ name }) => {
  const onCardClick = () => {
    console.log(`Card Clicked`);
  };

  return (
    <Card bg="Light" text={'dark'} onClick={onCardClick}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Something</Button>
      </Card.Body>
    </Card>
  );
};


export const Roles: FunctionComponent = () => {

  const roles = ['Controller', 'Bookkeeper', 'Accountant', 'Staff Accountant',
    'Accounting Clerk', 'Accounting Manager', 'Auditor', 'Tax Accountant'];

  const rows = chunk(roles, 3);

  return (
    <Container>

      {rows.map((cols, rowIdx) => (
        <Row key={rowIdx} className="mt-4">
          {cols.map((col) => (
            <Col sm={4}>
              <RoleCard key={col} name={col}></RoleCard>
            </Col>
          ))}
        </Row>
      ))}

    </Container >
  );
};
