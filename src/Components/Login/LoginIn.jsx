import Form from '../UI/Form';
import { loginUser } from '../../Store/Authentication';

export default function LoginIn() {
  return (
    <Form
      formType="signIn"
      title="Sign In"
      btnText="Login"
      fn={loginUser}
      inputField={[{ label: 'Email address', name: 'email', type: 'email' }]}
    />
  );
}
