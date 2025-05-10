import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch('/api/cookies');
      const data = await res.json();
      if (data.role === 'landlord') router.push('/dashboard/landlord');
      else if (data.role === 'tenant') router.push('/dashboard/tenant');
      else if (data.role === 'admin') router.push('/dashboard/admin');
    };
    checkUser();
  }, []);

  return <p>Redirecting to your dashboard...</p>;
}
