import React, {useState, useEffect} from 'react'
import MainScreen from '../components/MainScreen'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../actions/userAction';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  useEffect(() => {
    if(!userInfo){
      navigate("/")
    }
    else{
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [navigate, userInfo]);

 const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({name, email, password}));
  };

  return (
    <MainScreen title='Edit Profile'>
      <div>
        <Form onSubmit={submitHandler}>
          {loading && <Loading/>}
          {success && <ErrorMessage variant='success'>Updated Successfully</ErrorMessage>}
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" varient="primary">
              Update
          </Button>
        </Form>
      </div>
    </MainScreen>
  )
}

export default ProfileScreen
