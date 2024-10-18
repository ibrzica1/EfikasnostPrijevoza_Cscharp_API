import { Spinner } from 'react-bootstrap';
import useLoading from '../Hooks/useLoading';

export default function LoadingSpinner() {
  const { loading } = useLoading();

  return (
    <>
      {loading && (
        <div className='loading-spinner-overlay'>
          <Spinner animation='border' role='status' variant='primary' />
        </div>
      )}
    </>
  );
}


