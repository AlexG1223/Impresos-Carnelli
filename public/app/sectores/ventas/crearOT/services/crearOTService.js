
export async function crearOTService(formData) {
  const res = await fetch("https://trumanuy.com/ICSoftware/public/api/ordenes_trabajo/create.php", {
    method: "POST",
    body: formData
  });

  return await res.json();
}
