import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      Hello this is home
      <Button>
        <Link href="blog"> ini ke blog </Link>{" "}
      </Button>
    </main>
  );
}
