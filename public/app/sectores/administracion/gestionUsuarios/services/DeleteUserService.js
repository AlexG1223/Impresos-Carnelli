
export async function DeleteUserService(deletedUserId) {
 const res = await fetch("http://trumanuy.com/ICSoftware/public/api/users/delete.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
     body: JSON.stringify({ id: deletedUserId }) 
  });

  return await res.json();
}