
export async function crearOTService(formElement) {
  const formData = new FormData(formElement);

  const res = await fetch("http://trumanuy.com/ICSoftware/public/api/ordenes_trabajo/create.php", {
    method: "POST",
    body: formData
  });

  return await res.json();
}
