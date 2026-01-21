import { useForm } from 'react-hook-form';
import posthog from '../lib/posthog';

interface SearchData {
  location: string;
  priceMin: number;
  priceMax: number;
}

export function SearchForm({ onSearch }: { onSearch: (data: SearchData) => void }) {
  const { register, handleSubmit } = useForm<SearchData>();

  const handleSearch = (data: SearchData) => {
    const start = performance.now();
    onSearch(data);
    const duration = performance.now() - start;
    posthog.capture('search', { location: data.location, duration });
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <input placeholder="Location" {...register('location')} />
      <input type="number" placeholder="Min Price" {...register('priceMin')} />
      <input type="number" placeholder="Max Price" {...register('priceMax')} />
      <button type="submit">Search</button>
    </form>
  );
}
