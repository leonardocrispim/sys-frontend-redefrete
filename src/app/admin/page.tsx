import { getServerSession } from 'next-auth/next';

import { authOptions } from '@lib/auth';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Bem Vindo</h1>

      <h3>{session?.user?.name}</h3>
    </div>
  );
}
