import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Message, Icon, Form, Segment, Button } from 'semantic-ui-react'
import catchErrors from '../utils/catchErrors'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { handleLogin } from '../utils/auth'


const INTIAL_STATE = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
}

function Signup() {
  const [user, setUser] = useState(INTIAL_STATE);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleChange = () => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    const isMatched = user.password === user.confirmPassword;
    isUser && isMatched ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/signup`
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Message attached
      icon="settings"
      header="Get Started"
      content="Create an Account"
      color="teal"
    />
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
      <Message
        error
        header="Oops!!"
        content={error}
      />
      <Segment>
        <Form.Input
          icon='user'
          fluid
          iconPosition="left"
          name="name"
          label="Name"
          placeholder="Enter Your Name"
          onChange={handleChange}
        />
        <Form.Input
          icon='envelope'
          fluid
          type="email"
          iconPosition="left"
          name="email"
          label="Email"
          placeholder="Enter Your Email"
          onChange={handleChange}
        />
        <Form.Input
          icon='lock'
          fluid
          type="password"
          iconPosition="left"
          name="password"
          label="password"
          placeholder="Enter Your password"
          onChange={handleChange}
        />
        <Form.Input
          icon='lock'
          fluid
          type="password"
          iconPosition="left"
          name="confirmPassword"
          label="confirm password"
          placeholder="Confirm Your password"
          onChange={handleChange}
        />
        <Button
          icon="signup"
          disabled={disabled || loading}
          type="submit"
          color="green"
          content="signup"
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help" />
      Already User ?{" "}
      <Link href='/login'>
        <a>Login Here</a>
      </Link>{" "}instead
    </Message>
  </>;
}

export default Signup;
