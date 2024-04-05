import Swal from "sweetalert2";
/**
 *
 * @param title string
 * @param htmlText string | also can be added HTML tags example: `${<strong>text</strong>}`
 * @param confirmBtnText string | btn name
 */
export const confirmUpdatePrompt = (
  title: string,
  htmlText: string,
  confirmBtnText: string
) =>
  Swal.fire({
    title: title,
    html: htmlText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffda79",
    cancelButtonColor: "#b7b7b7",
    confirmButtonText: confirmBtnText,
  });

/**
 *
 * @param title string
 * @param htmlText string | also can be added HTML tags example: `${<strong>text</strong>}`
 */
export const updateActionPrompt = (title: string, htmlText: string) => {
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
