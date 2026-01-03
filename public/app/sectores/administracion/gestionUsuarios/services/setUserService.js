export async function createUserService(user) {
  const res = await fetch("http://impresoscarnelli.com/public/api/users/create.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  return await res.json();
}
