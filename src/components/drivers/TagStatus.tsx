export default function TagStatus({
  status,
  children,
}: {
  status: string;
  children: any;
}) {
  const colorClasses: any = {
    EM_ANALISE:
      'ring-rede-blue-300/90 text-rede-blue-300/90 bg-rede-blue-800/50',
    REPROVADO: 'ring-rede-red-400 text-rede-red-300 bg-rede-red-800',
    APROVADO: 'ring-rede-green-300/90 text-rede-green-300/90 bg-rede-green-800',
    BLOQUEADO: 'ring-rede-red-300/90 text-rede-red-300/90 bg-rede-red-800',
    DESATIVADO: 'ring-rede-green-300/90 text-black-300/90 bg-black-800',
    NAO_ENVIADO: 'ring-rede-gray-300/90 text-rede-gray-200/90 bg-rede-gray-600',
    NOVO_CADASTRO: 'ring-rede-blue-300/90 text-rede-blue-300 bg-rede-blue-800',
  };

  const classes = `block w-full text-center items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colorClasses[status]}`;

  return <span className={classes}>{children}</span>;
}
