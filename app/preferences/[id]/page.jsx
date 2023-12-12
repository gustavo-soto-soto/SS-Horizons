import axios from "axios";

async function getUserData(userId) {
  try {
    const response = await axios(`${process.env.SERVER_URL}/api/users/${userId}`);

    const data = await response.data
    
    return data

  } catch (error) {
    console.log(error);
  }
}

export default async function Page({ params: { id } }) {
  const user = await getUserData(id);

  return <div>{JSON.stringify(user)}</div>;
}
