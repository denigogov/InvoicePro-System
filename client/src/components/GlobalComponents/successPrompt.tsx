import { NavigateFunction } from "react-router-dom";
import Swal from "sweetalert2";

export const successMessage = (title: string) => {
  const test = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
    iconColor: "#003366",
    icon: "success",
    title: title,
  });
  test.fire({});
};

export const successMessageWithNavigation = (
  title: string,
  navigate: NavigateFunction,
  timing?: number
) => {
  const test = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timing ? timing : 1700,
    timerProgressBar: true,
    iconColor: "#003366",
    icon: "success",
    title: title,
    didClose() {
      navigate("/login");
    },
  });

  console.log(test);
  test.fire({});
};

export const successRequest = (title: string, htmlText: string) => {
  Swal.fire({
    position: "center",
    icon: "success",
    iconColor: "#003366",
    title: title,
    text: htmlText,
    showConfirmButton: false,
    timer: 2000,
  });
};
