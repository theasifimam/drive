import { Lock, Mail, User } from "lucide-react";

export const signupFields = [
  {
    id: "name",
    label: "Operator_Name",
    placeholder: "Full_Identity",
    icon: User,
    type: "text",
  },
  {
    id: "email",
    label: "Access_Identifier",
    placeholder: "name@mazlis.com",
    icon: Mail,
    type: "email",
  },
  {
    id: "password",
    label: "Passphrase",
    placeholder: "••••••••••••",
    icon: Lock,
    type: "password",
  },
];
