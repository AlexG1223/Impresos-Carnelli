export async function createUserService(user) {
  const res = await fetch("/ICSoftware/public/api/users/create.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  return await res.json();
}
