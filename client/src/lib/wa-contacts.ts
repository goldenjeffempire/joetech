export const WA_CONTACTS = [
  {
    label: "JOE Technologies",
    number: "+234 901 704 8791",
    wa: (msg?: string) =>
      `https://wa.me/2349017048791?text=${encodeURIComponent(
        msg ?? "Hello JOE Technologies, I'd love to discuss a project."
      )}`,
  },
];
