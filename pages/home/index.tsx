import * as cookie from "cookie";
import LogoutButton from "../../components/ui/buttons/LogoutButton";

export function getServerSideProps(context: any) {
  if (context.req.headers.cookie) {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    console.log("parsedCookies: ", parsedCookies);
    const sessionCookie = JSON.parse(parsedCookies.session);
    const { token } = sessionCookie;
    if (!token) {
      return {
        redirect: {
          destination: "/auth/login",
        },
      };
    }
    return { props: {} };
  }
  return {
    redirect: {
      destination: "/auth/login",
    },
  };
}

export default function Home() {
  return (
    <div>
      <div>Home Page</div>
      <LogoutButton />
    </div>
  );
}
