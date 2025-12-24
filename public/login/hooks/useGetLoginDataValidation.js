export function useGetLoginDataValidation(username, password) {
    if (!username || !password) return false;
    return true;
}
