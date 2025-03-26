import TopNavComp from "@/components/TopNav/TopNavComp";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <TopNavComp />
      <div className="bg-gray-100 h-screen flex flex-col align-center items-center justify-center m-auto">
        <SignIn />
      </div>
    </>
  );
}
