import Form from '../UI/Form';
import { updateUser } from '../../Store/Authentication';

export default function ProfileEdit() {
  return <Form formType="edit" title="Edit Profile" btnText="Save" fn={updateUser} />;
}
