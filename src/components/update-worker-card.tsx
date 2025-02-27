"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, PencilIcon } from "lucide-react";
import { forwardRef, useState } from "react";
import UserType from "@/types/UserType";

interface UpdateUserCardProps {
  user: UserType;
  onClose: () => void;
}

const UpdateWorkerCard = forwardRef<HTMLDivElement, UpdateUserCardProps>(
  ({ user, onClose }, ref) => {
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.ime);
    const [lastName, setLastName] = useState(user.prezime);
    const [loading, setLoading] = useState(false);

    const handlePropagation = (event: React.MouseEvent) => {
      event.stopPropagation();
    };

    const handleUpdateUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://localhost:7206/api/Korisnik/${user.id}?Ime=${firstName}&Prezime=${lastName}&Email=${email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("User updated successfully", data);
      } catch (error) {
        console.error("Error updating user", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div
        className="grid grid-rows-1 grid-cols-1 place-items-center fixed top-0 left-0 right-0 bottom-0 bg-[#00000050] z-10"
        onClick={onClose}
      >
        <Card className="w-96" ref={ref} onClick={handlePropagation}>
          <CardHeader>
            <CardTitle className="flex">
              <PencilIcon className="h-6 w-6 mr-2" />
              Update Worker Information
            </CardTitle>
            <CardDescription>
              Update the information of an existing worker
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              className="mb-4"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleUpdateUser}
              className="mt-4 rounded-full bg-blue-400"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : <CheckCircle2 />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
);

UpdateWorkerCard.displayName = "UpdateUserCard";
export default UpdateWorkerCard;
