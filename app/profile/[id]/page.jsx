import User from "@/db/models/user";
import Form from "./components/Form";
import { connectDB } from "@/db/mongodb";

async function getUser(userId) {
  try {
    await connectDB();
    const user = User.findById(userId).select("+password");
    return user;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default async function Page({ params: { id } }) {
  const user = await getUser(id);

  return (
    <div className="w-full h-auto min-h-screen bg-[#092635] grid grid-cols-1 items-center justify-center p-2">
      <Form user={user} />
    </div>
  );
}
