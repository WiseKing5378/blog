import Form from '../UI/Form';

export default function ProfileEdit() {
  return (
    <Form
      title="Edit Profile"
      btnText="Save"
      fn={() => {}}
      inputField={[
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Email address', name: 'email', type: 'email' },
        { label: 'New password', name: 'password', type: 'password' },
        { label: 'Avatar image (url)', name: 'image', type: 'text' },
      ]}
    />
  );
}
