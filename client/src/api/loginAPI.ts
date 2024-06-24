const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * @async function
 * @param token string
 * @returns Checking is the token valid or not if valid user can change his password!
 * no body just cheking the token !
 */
export const passwordResetTokenConfirm = async (token: string) => {
  const response = await fetch(`${API_URL}/user/confirmRestToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Link Has Expire");
  } else {
    response.json();
  }
};

/**
 *
 * @param token
 * @param password string
 * @returns POST request for changing the password !
 */
export const changePasswordRequest = async (token: string, query: string) => {
  const res = await fetch(`${API_URL}/user/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: query,
    }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(`${errorResponse.validationErrors[0].message}`);
  }
};
