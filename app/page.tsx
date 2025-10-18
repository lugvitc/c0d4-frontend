import SignIn from "./signInUp/signIn";
import SignUp from "./signInUp/signUp";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  if (params?.page === "signIn") {
    return <SignIn />;
  }
  return <SignUp />;
}
