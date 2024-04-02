import Swal from "sweetalert2";

// Error FN that I use in every request which don't have validation !
export const apiGeneralErrorHandle = (
  err?: unknown,
  personalError?: string
) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    confirmButtonColor: "#ffda79",
    text: `${(err as Error).message ?? ""} ${personalError ?? ""}`,
  });
};

export const apiErrorWithFN = (err?: unknown, personalError?: string) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    confirmButtonColor: "#ffda79",
    text: `${(err as Error).message ?? ""} ${personalError ?? ""}`,
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      localStorage.removeItem("userAccess");
      window.location.href = "/";
    }
  });
};
