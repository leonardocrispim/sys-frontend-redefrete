import FormLogin from './components/FormLogin';

export default function LoginPage() {
  return (
    <>
      <FormLogin />
      {process.env.NEXT_PUBLIC_URL_BACKEND}
    </>
  );
}
