import { getSessionData } from "/ICSoftware/public/UIAdministrator/services/getSessionData.js";
export async function useAdministrator() {
 const app = document.getElementById("app")
    const res = await getSessionData()
    console.log(res)

}

useAdministrator()