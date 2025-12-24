export async function ModifyUserService(updatedUser) {
 const res = await fetch("http://trumanuy.com/ICSoftware/public/api/users/update.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedUser)
  });

  return await res.json();
}