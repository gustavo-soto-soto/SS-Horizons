import axios from "axios";

async function getUserData(userId) {
  try {
    const response = await axios(
      `${process.env.SERVER_URL}/api/user?userId=${userId}`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page({ params: { id } }) {
  const user = await getUserData(id);

  return (
    <div className="grid gap-2">
      <input
        type="text"
        name="firstname"
        id="firstname"
        placeholder="Nombres..."
        required
        value={user.firstname}
      />
      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Apellidos..."
        required
        value={user.lastname}
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Correo electrónico..."
        required
        value={user.email}
      />
      <input
        type="number"
        name="phone"
        id="phone"
        placeholder="Teléfono..."
        required
        value={user.phone}
      />

      <hr />

      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter username..."
        required
        value={user.username}
      />

      <input type="button" value="Modificar" />
    </div>
  );
}
