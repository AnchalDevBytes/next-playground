export const formSchema = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter username",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    required: true,
  },
  {
    id: "country",
    label: "Country",
    type: "select",
    options: ["India", "USA", "Canada"],
    required: true,
  },
];
