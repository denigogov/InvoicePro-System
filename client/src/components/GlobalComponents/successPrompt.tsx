import Swal from "sweetalert2";

export const successMessage = () => {
  const test = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: "#ffda79",
    icon: "success",
    title: "code successfully send",
  });
  test.fire({});
};

export const successRequest = (title: string, htmlText: string) => {
  Swal.fire({
    position: "center",
    icon: "success",
    iconColor: "#ffda79",
    title: title,
    text: htmlText,
    showConfirmButton: false,
    timer: 2000,
  });
};