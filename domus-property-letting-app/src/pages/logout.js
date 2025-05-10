import { useRouter } from 'next/router';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout');
    router.push('/');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
