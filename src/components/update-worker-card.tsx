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
import { PencilIcon } from "lucide-react";
import { forwardRef, useState } from "react";
import UserType from "@/types/UserType";

interface UpdateUserCardProps {
  user: UserType;
  onClose: () => void;
}

const UpdateWorkerCard = forwardRef<HTMLDivElement, UpdateUserCardProps>(
  ({ user, onClose }, ref) => {
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    const handlePropagation = (event: React.MouseEvent) => {
      event.stopPropagation();
    };

    const handleUpdateUser = () => {
      console.log("Updating user");
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
            >
              {/* {updateing && <LoaderCircle className="h-4 w-4 animate-spin"/>} */}
              Update Worker
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
);

UpdateWorkerCard.displayName = "UpdateUserCard";
export default UpdateWorkerCard;
