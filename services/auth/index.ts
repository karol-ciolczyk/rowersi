import { useFetchApiV1 } from "~/composables/useFetchApiV1";

async function authInfo() {
  return await useFetchApiV1("/auth");
}
async function signIn(payload) {
  return await useFetchApiV1("/login", { body: payload, method: "POST" });
}
async function signupUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return useFetch<string>("/api/v1/users", {
    method: "POST",
    body: { username, password },
  });
}

export default { authInfo, signIn, signupUser };
