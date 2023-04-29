import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchData } from '../../Store/Articles';

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Result
      icon={<SmileOutlined />}
      title="Great, we have done all the operations!"
      extra={
        <Button
          onClick={() => {
            dispatch(fetchData(0));
            navigate('/', { replace: true });
          }}
          type="primary"
        >
          Go home
        </Button>
      }
    />
  );
}
