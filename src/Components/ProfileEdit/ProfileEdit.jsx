import Form from '../UI/Form';
import { updateUser } from '../../Store/Authentication';

export default function ProfileEdit() {
  return (
    <Form
      formType="edit"
      title="Edit Profile"
      btnText="Save"
      fn={updateUser}
      inputField={[
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Email address', name: 'email', type: 'email' },
        { label: 'Avatar image (url)', name: 'image', type: 'url' },
      ]}
    />
  );
}
