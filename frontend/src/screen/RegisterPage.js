import React, { useState, useEffect} from 'react'
import MainScreen from '../components/MainScreen'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userAction';
import {useNavigate} from 'react-router-dom'
import './registerPage.css';

const RegisterPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
        navigate("/mynotes");
        }
    }, [navigate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
        setMessage("Passwords do not match");
        } else dispatch(register(name, email, password));
    };

  return (
    <MainScreen title='Register'>
        <div className='registerContainer'>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            {loading && <Loading/>}
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" value={confirmpassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Already a User <Link to='/login' className="text-decoration-none" >Login Here</Link>
                </Col>
            </Row>
        </div>
    </MainScreen>
  )
}

export default RegisterPage
