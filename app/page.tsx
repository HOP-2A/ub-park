"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, useAuth, UserButton, useUser } from "@clerk/nextjs";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react";

type placetype = {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: string;
  longitude: string;
  parkings: string[];
};
export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [places, setPlaces] = useState<placetype[]>([]);
  const { user: clerkUser } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn === false) {
      router.push("/startPage");
    }
    if (clerkUser?.publicMetadata.role === "OWNER") {
      router.push("/owner/dashbord");
    }
  }, [clerkUser?.publicMetadata.role, isLoaded, isSignedIn, router, router.push]);

  useEffect(() => {
    const getplaces = async () => {
      const response = await fetch("/api/place");
      const data = await response.json();
      setPlaces(data.message);
    };
    getplaces();
  }, []);

  // const IsOwner = () => {
  //   if (clerkUser?.publicMetadata.role === "OWNER") {
  //     router.push("/owner");
  //   }
  // };

  return (
    <div>
      <div className="flex items-center justify-end px-4 py-3 sm:px-6">
        {" "}
        <UserButton />
      </div>
      <div className="flex flex-wrap justify-center gap-5 px-6">
        {places.map((place) => (
          <Card
            key={place.id}
            onClick={() => router.push(`/${place.id}`)}
            className="w-[260px] cursor-pointer bg-white border border-pink-100
                       rounded-2xl shadow-md transition-all duration-300
                       hover:shadow-xl hover:-translate-y-2"
          >
            <CardFooter className="p-0"></CardFooter>

            <CardHeader className="space-y-2">
              <CardTitle className="text-lg font-semibold ">
                {place.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-gray-600">
              ADDRESS:{place.address}
              <div>
                NUMBER OF PARKINGLOTS:
                {place.parkings.length}
              </div>
            </CardContent>

            <CardAction className="flex justify-end px-4 pb-4">
              <Button className="hover:translate-x-1 transition bg-blue-700">
                PARK HERE{" "}
              </Button>
            </CardAction>
          </Card>
        ))}
      </div>
    </div>
  );
}
