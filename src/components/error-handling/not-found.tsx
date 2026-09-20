import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const CONTAINER_STYLE: React.CSSProperties = {
  minHeight: '60vh',
};

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={CONTAINER_STYLE}
    >
      <div className="text-center">
        <h1 className="display-1">Page not found</h1>
        <p className="text-muted">The page you're looking for doesn't exist.</p>
        <div className="mt-4">
          <Button variant="primary" onClick={handleGoHome} className="me-2">
            Go to Home
          </Button>
          <Button variant="outline-secondary" onClick={handleGoBack}>
            Go Back
          </Button>
        </div>
      </div>
    </Container>
  );
};
