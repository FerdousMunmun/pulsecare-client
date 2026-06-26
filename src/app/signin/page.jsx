"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import React from "react";

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {

      const result =
        await authClient.signIn.email({
          email: user.email,
          password: user.password,
          callbackURL: "/dashboard",
        });

      if (result?.error) {
        alert(result.error.message);
        return;
      }

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/jwt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: user.email,
          }),
        }
      );

    } catch (error) {

      console.log(error);

      alert("Invalid email or password");

    }
  };
  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6 max-w-2xl mx-auto border mt-5">
      <Surface className="w-full">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="font-bold text-center">Login</Fieldset.Legend>
            <Description className="text-center">
              Login with your email and password
            </Description>
            <Fieldset.Group>
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Password" variant="secondary" />
                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Button type="submit" className={"w-full bg-red-800"}>
              Login
            </Button>

            <p className="text-center mt-4">
              Don't have an account?{" "}
              <a
                href="/registration"
                className="text-red-600 font-semibold hover:underline"
              >
                Registration
              </a>
            </p>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}