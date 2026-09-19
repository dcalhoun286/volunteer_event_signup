import { Card, Col, Container, Row } from 'react-bootstrap';
import { useGetEventsQuery } from '../../redux/api/events.api';

const TEXT_STYLE: React.CSSProperties = {
  fontWeight: 'bold',
};

const ERROR_STYLE: React.CSSProperties = {
  color: 'red',
};

export const Events = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useGetEventsQuery(undefined, { pollingInterval: 30000 });

  const eventContent: React.JSX.Element = isLoading ? (
    <p style={TEXT_STYLE}>Events Loading...</p>
  ) : error ? (
    <p style={ERROR_STYLE}>Failed to load events. Please try again later.</p>
  ) : !events || events.length === 0 ? (
    <p className="my-4">No events available.</p>
  ) : (
    <Container fluid>
      <Row>
        {events.map(
          ({ name, id, description, location, start_date, timezone }) => (
            <Col key={id} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title style={TEXT_STYLE}>{name}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <Card.Text className="text-muted">{location}</Card.Text>
                  <Card.Text className="text-muted small">
                    {new Date(start_date).toLocaleString('en-US', {
                      timeZone: timezone,
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    Timezone: {timezone}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Container>
  );

  return (
    <>
      <h3 className="display-6">Events Page</h3>
      <p className="lead">
        Below are all of our upcoming events — take a look through to find
        volunteer opportunities you may be interested in.
      </p>
      {eventContent}
    </>
  );
};
