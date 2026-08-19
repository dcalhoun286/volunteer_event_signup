import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useToggle } from "../../../hooks/useToggle";
import { useLoginMutation } from "../../../redux/api/auth.api";
import type { LoginRequest } from "../../../redux/api/auth.api";

interface LoginModalProps {
    showModal: boolean;
    setShowModal: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
    const { showModal, setShowModal } = props;
    const { toggle: isLoading, handleToggle: setIsLoading } = useToggle();
    const [ login ] = useLoginMutation();
    const [ formData, setFormData ] = useState<LoginRequest>({
        email: "",
        password: "",
    });

    const handleCloseModal = useCallback(() => {
        setFormData({ email: "", password: "" });
        setShowModal();
    }, [setShowModal]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading();
        try {
            await login(formData).unwrap();
            setFormData({ email: "", password: "" });
            setShowModal();
        } catch (err) {
            console.error(err);
            // if error fails, eventually use this to warn the user the login failed
            // const errorMsg = err instanceof Error ? err.message : "Login failed";
        } finally {
            setIsLoading();
        }
    }, [formData, login, setIsLoading, setShowModal]);

    return (
        <Modal show={showModal} backdrop="static" keyboard={false} onHide={handleCloseModal}>
            <Modal.Header closeButton={!isLoading}>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="login-form" onSubmit={handleSubmit}>
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="btn btn-lg"
                    variant="secondary"
                    onClick={setShowModal}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    className="btn btn-lg custom-button"
                    type="submit"
                    form="login-form"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
