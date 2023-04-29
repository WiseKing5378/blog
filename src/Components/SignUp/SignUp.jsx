import Form from '../UI/Form';
import { registerUser } from '../../Store/Authentication';

export default function SignUp() {
  return <Form formType="signUp" title="Sign Up" btnText="Create" fn={registerUser} />;
}
