import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import UserType from "@/types/UserType";
import { Trash2 } from "lucide-react";

interface DeleteWorkerDialogProps {
  workerToDelete: UserType | null;
  onClose: () => void;
}

const DeleteWorkerDialog: React.FC<DeleteWorkerDialogProps> = ({ workerToDelete, onClose }) => {

  const handleDeleteUser = async () => {
    if (!workerToDelete) return;

    try {
      const response = await fetch(`https://localhost:7206/api/Korisnik/DeleteUser?id=${workerToDelete.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("User deleted successfully");
      onClose();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="grid grid-rows-1 grid-cols-1 place-items-center fixed top-0 left-0 right-0 bottom-0 bg-[#00000050] z-10" onClick={onClose}>
      <Card className="w-100">
        <CardHeader>
          <CardTitle className="leading-8">Are you sure you want to delete this worker?</CardTitle>
          <CardDescription>This worker {workerToDelete?.ime} {workerToDelete?.prezime} will be deleted from our servers!</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end content-end">
          <Button variant="outline" onClick={onClose} className="me-4 rounded-full">Cancel</Button>
          <Button className="rounded-full" variant="destructive" onClick={handleDeleteUser}>
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteWorkerDialog;