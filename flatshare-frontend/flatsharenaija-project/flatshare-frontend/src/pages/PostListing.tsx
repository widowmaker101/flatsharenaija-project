import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function PostListing() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post('http://localhost:8000/listings', data); // Adjust endpoint if needed
      alert('Listing posted successfully!');
      reset();
    } catch (err) {
      alert('Error posting. Check backend.');
    }
  };

  // ... (keep the same form JSX from before)
  // Just replace onSubmit with this one
}
