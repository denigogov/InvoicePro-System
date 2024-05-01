import Swal from "sweetalert2"; // General Delete Message Propt Confirm

export const confirmDeletePrompt = (title: string, htmlText: string) =>
  Swal.fire({
    title: title,
    html: htmlText,
    icon: "warning",
    showCancelButton: true,
    iconColor: "#da0404",
    confirmButtonColor: "#da0404",
    cancelButtonColor: "#b7b7b7",
    confirmButtonText: "Confirm ",
  });

// When Delete Confirm is true !
export const deleteActionPrompt = (title?: string) =>
  Swal.fire({
    position: "center",
    icon: "success",
    iconColor: "#da0404",
    title: !title ? "Deleted!" : title,
    showConfirmButton: false,
    timer: 1500,
  });
