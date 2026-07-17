"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


interface OrbProps {
  size?: number;
  className?: string;
  label?: string;
}


export function Orb({
  size = 220,
  className,
  label,
}: OrbProps) {


  return (

    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}

      style={{
        width:size,
        height:size,
      }}
    >


      {/* Glow Layer */}

      <motion.div

        className="absolute inset-0 rounded-full blur-3xl opacity-70"

        style={{
          background:"var(--gradient-orb)",
        }}

        animate={{
          scale:[1,1.15,1],
          opacity:[0.5,0.8,0.5],
        }}

        transition={{
          duration:4,
          repeat:Infinity,
          ease:"easeInOut",
        }}

      />



      {/* Main Orb */}

      <motion.div

        className="relative rounded-full animate-pulse-glow"

        style={{
          width:size * 0.7,
          height:size * 0.7,
          background:"var(--gradient-orb)",
        }}

        animate={{
          y:[0,-8,0],
        }}

        transition={{
          duration:5,
          repeat:Infinity,
          ease:"easeInOut",
        }}

      >


        <div

          className="absolute inset-4 rounded-full opacity-60"

          style={{
            background:
              "radial-gradient(circle at 30% 25%, white, transparent 40%)",
          }}

        />



        {label && (

          <div className="absolute inset-0 flex items-center justify-center">

            <span className="text-white/90 text-sm font-medium tracking-wide">

              {label}

            </span>

          </div>

        )}


      </motion.div>





      {/* Orbit Particles */}

      {[0,1,2].map((item)=> (

        <motion.div

          key={item}

          className="absolute rounded-full bg-gold"

          style={{
            width:6,
            height:6,
            boxShadow:"0 0 12px currentColor",
          }}


          animate={{

            rotate:360,

            x:
              Math.cos(
                (item * 2 * Math.PI) / 3
              ) *
              (size / 2 - 8),


            y:
              Math.sin(
                (item * 2 * Math.PI) / 3
              ) *
              (size / 2 - 8),

          }}


          transition={{
            duration:6 + item,
            repeat:Infinity,
            ease:"linear",
          }}

        />

      ))}


    </div>

  );

}