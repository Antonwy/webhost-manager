import dynamic from 'next/dynamic';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';

const RequiresAuthentication = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)) as any,
  { ssr: false }
);

export default RequiresAuthentication;
