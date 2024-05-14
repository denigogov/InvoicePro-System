/**
 *
 * @param sequence which number to come in the row example ID 1 and auto Increment next will be 2 ... 3 ...4
 * @returns 24-0000${sequence} example: 24-00005
 */
export const generateInvoiceNumber = (sequence: number | string): string => {
  const year = new Date().getFullYear().toString().slice(-2);
  const formattedSequence = String(sequence).padStart(5, "0");

  return `${year}-${formattedSequence}`;
};
