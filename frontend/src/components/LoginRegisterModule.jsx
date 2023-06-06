import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

export const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function postUser () {
    try {
        const response = await axios.post('http://localhost:5000/register', {
          firstName,
          lastName,
          gender,
          email,
          password,
          confirmPassword,
        });
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Gender:', gender);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    postUser()
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export const Login = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function getUser() {
    try {
      const response = await axios.post('http://localhost:5000/login',
        {
          email,
          password,
        },
        {
          withCredentials: true, // include session cookie in headers
        }
      );
      console.log('Server response:', response.data);
      const { user } = response.data;
      dispatch({ type: 'LOGIN', payload: { user, name: user.firstName, gender: user.gender } });

      // "LOGIN" action should save the session and user data.
      // The reducer could also save the data to localstorage
      // or you can create a custom hook which stores a state and does this automatically for you
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      localStorage.setItem('session', JSON.stringify(response.data.session));
      // navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('email:', email);
    console.log('password:', password);
    getUser();
  };

  useEffect(() => {
    console.log('Name:', state.name);
    console.log('Gender:', state.gender);
  }, [state]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

