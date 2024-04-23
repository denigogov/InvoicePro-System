export const generateInvoiceNumber = (sequence: number | string): string => {
  const year = new Date().getFullYear().toString().slice(-2);
  const formattedSequence = String(sequence).padStart(5, "0");

  return `${year}-${formattedSequence}`;
};
