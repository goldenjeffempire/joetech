export const WA_CONTACTS = [
  {
    label: "JOE Technologies",
    number: "09017048791",
    wa: (msg?: string) =>
      `https://wa.me/2349017048791?text=${encodeURIComponent(
        msg ?? "Hello JOE Technologies, I'd love to discuss a project."
      )}`,
    tag: "",
  },
  {
    label: "JOE Technologies",
    number: "08159088343",
    wa: (msg?: string) =>
      `https://wa.me/2348159088343?text=${encodeURIComponent(
        msg ?? "Hello JOE Technologies, I'd love to discuss a project."
      )}`,
    tag: "",
  },
];
