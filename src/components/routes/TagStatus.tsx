export default function TagStatus({
  status,
  children,
}: {
  status: string;
  children: any;
}) {
  const colorClasses: any = {
    ABERTO: 'ring-rede-blue-300/90 text-rede-blue-300/90 bg-rede-blue-800/50',
    EM_ANDAMENTO: 'ring-rede-gray-400 text-rede-gray-300 bg-rede-gray-700',
    FINALIZADO:
      'ring-rede-green-300/90 text-rede-green-300/90 bg-rede-green-800',
  };

  const classes = `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colorClasses[status]}`;

  return <span className={classes}>{children}</span>;
}
