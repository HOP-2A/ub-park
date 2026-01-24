"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { push } = useRouter();
  const [value, setValue] = useState({
    email: "",
    password: "",
    userType: "",
    username: "",
  });

  const handler = (e) => {
    const { value, name } = e.target;

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const createUser = async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
        username: value.username,
        type: value.userType,
      }),
    });
    push("/");
  };
  console.log(value);
  return (
    <div>
      {" "}
      <div>
        <Input
          placeholder="EMAIL"
          value={value.email}
          name="email"
          onChange={handler}
        />
        <Input
          placeholder="PASSWORD"
          value={value.password}
          name="password"
          onChange={handler}
        />
        <Input
          placeholder="USERNAME"
          value={value.username}
          name="username"
          onChange={handler}
        />
        <select value={value.userType} name="userType" onChange={handler}>
          <option value="USER">USER</option>
          <option value="OWNER">OWNER</option>
        </select>
        <Button onClick={createUser}>SIGN UP</Button>
      </div>
    </div>
  );
}
