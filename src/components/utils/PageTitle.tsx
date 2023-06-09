type TypeData = {
  children: React.ReactNode;
};

export default function PageTitle({ children }: TypeData) {
  return <h1 className="text-2xl font-semibold text-gray-900">{children}</h1>;
}
