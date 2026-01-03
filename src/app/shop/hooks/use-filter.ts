import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function useFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getFilterUrl = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  const setFilter = (name: string, value: string) => {
    router.push(getFilterUrl(name, value));
  };

  return { setFilter, getFilterUrl };
}
