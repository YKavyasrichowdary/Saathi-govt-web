"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import {
  Mail,
  Lock,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { signIn } from "next-auth/react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

const signinSchema =
  z.object({

    email:
      z.string()
        .email(),

    password:
      z.string()
        .min(6),

  });

type SigninValues =
  z.infer<typeof signinSchema>;

export default function SigninPage() {
  const router =
    useRouter();
  const {

    register,

    handleSubmit,

    formState: {
      errors,
      isSubmitting
    }

  } = useForm<SigninValues>({

    resolver: zodResolver(signinSchema)

  });

  async function onSubmit(values: SigninValues) {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Welcome back ✨");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }





  return (

    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background">
      {/* Ambient background glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-25 dark:opacity-20 animate-pulse-glow"
          style={{
            background: "var(--gradient-primary)"
          }}
        />
        <div
          className="absolute -bottom-[30%] -right-[20%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-20 dark:opacity-15"
          style={{
            background: "var(--gradient-orb)"
          }}
        />
      </div>

      <motion.div

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="glass rounded-3xl p-8 shadow-elegant w-full max-w-md"

      >


        <Link
          href="/"
          className="flex justify-center items-center gap-2 mb-8"
        >

          <div

            className="w-10 h-10 rounded-xl animate-pulse-glow"

            style={{
              background: "var(--gradient-orb)"
            }}

          />


          <h1 className="text-2xl font-semibold">

            Saathi

          </h1>


        </Link>


        <div className="text-center mb-8">

          <h2 className="text-2xl font-semibold">

            Welcome back

          </h2>

          <p className="text-sm text-muted-foreground mt-1">

            Please enter your details to sign in.

          </p>

        </div>



        <form

          onSubmit={handleSubmit(onSubmit)}

          className="space-y-5"

        >


          <Field

            label="Email"

            icon={Mail}

            error={errors.email?.message}

            {...register("email")}

          />



          <Field

            label="Password"

            icon={Lock}

            type="password"

            error={errors.password?.message}

            {...register("password")}

          />



          <Button

            type="submit"

            className="w-full h-11 rounded-full text-white font-medium shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.98] transition-all border-0 cursor-pointer"

            style={{
              background: "var(--gradient-primary)"
            }}

          >


            {
              isSubmitting ?

                <Loader2 className="animate-spin" />

                :

                <>

                  Continue

                  <ArrowRight className="ml-2 w-4" />

                </>

            }


          </Button>



        </form>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-border/50"></div>
          <span className="flex-shrink mx-4 text-muted-foreground text-xs uppercase font-medium">or connect with</span>
          <div className="flex-grow border-t border-border/50"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl glass hover:bg-muted/30 flex items-center justify-center gap-2 text-foreground cursor-pointer border border-border/50"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                style={{ fill: "#4285F4" }}
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                style={{ fill: "#34A853" }}
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                style={{ fill: "#FBBC05" }}
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                style={{ fill: "#EA4335" }}
              />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl glass hover:bg-muted/30 flex items-center justify-center gap-2 text-foreground cursor-pointer border border-border/50"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </Button>
        </div>




        <p className="text-center text-sm mt-6 text-muted-foreground">

          New to Saathi?


          <Link

            href="/auth/signup"

            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium ml-1 transition-colors hover:underline"

          >

            Create account

          </Link>


        </p>


      </motion.div>


    </main>


  )

}





function Field({
  label,
  icon: Icon,
  error,
  ...props
}: any) {

  return (

    <div>

      <Label>{label}</Label>


      <div className="relative mt-1">

        <Icon className="absolute left-3 top-3.5 w-4 text-muted-foreground" />

        <Input

          className="pl-10 rounded-xl h-11"

          {...props}

        />

      </div>


      {
        error &&

        <p className="text-xs text-destructive mt-1">

          {error}

        </p>

      }


    </div>

  )

}