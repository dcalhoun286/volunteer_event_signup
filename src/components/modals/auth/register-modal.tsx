import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useToggle } from '../../../hooks/useToggle';
import { useRegisterMutation } from '../../../redux/api/auth.api';
import type { RegisterRequest } from '../../../redux/api/auth.api';

interface RegisterModalProps {
    showModal: boolean;
    setShowModal: () => void;
}

export const RegisterModal = (props: RegisterModalProps) => {
    const { showModal, setShowModal } = props;
    const { toggle: isLoading, handleToggle: setIsLoading } = useToggle();
    const [register] = useRegisterMutation();
    const [formData, setFormData] = useState<RegisterRequest>({
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
    });

    const handleCloseModal = useCallback(() => {
        setFormData({ email: '', password: '', password_confirmation: '', first_name: '', last_name: '' });
        setShowModal();
    }, [setShowModal]);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        async (e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();

            setIsLoading();
            try {
                await register(formData).unwrap();
                setFormData({ email: '', password: '', password_confirmation: '', first_name: '', last_name: '' });
                setShowModal();
            } catch (err) {
                console.error(err);
                // if error fails, eventually use this to warn the user the register failed
                // const errorMsg = err instanceof Error ? err.message : "Register failed";
            } finally {
                setIsLoading();
            }
        },
        [formData, register, setIsLoading, setShowModal]
    );

    return (
        <Modal
            show={showModal}
            backdrop="static"
            keyboard={false}
            onHide={handleCloseModal}
        >
            <Modal.Header closeButton={!isLoading}>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="register-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm password"
                            value={formData.password_confirmation}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            placeholder="Enter first name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            placeholder="Enter last name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="btn btn-lg"
                    variant="secondary"
                    onClick={handleCloseModal}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    className="btn btn-lg custom-button"
                    type="submit"
                    form="register-form"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
