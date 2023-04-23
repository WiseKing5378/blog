import Form from '../UI/Form';
import { registerUser } from '../../Store/Authentication';

export default function SignUp() {
  return (
    <Form
      formType="signUp"
      title="Sign Up"
      btnText="Create"
      fn={registerUser}
      inputField={[
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Email address', name: 'email', type: 'email' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'Repeat password', name: 'confirmPassword', type: 'password' },
      ]}
    />
  );
}
