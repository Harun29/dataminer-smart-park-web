"use client";

import React, { useState, useEffect } from "react";
import { columns } from "./columns";
import UserType from "@/types/UserType";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, User2, UserPlus2Icon, UsersIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateWorkerCard from "@/components/update-worker-card";
import DeleteWorkerDialog from "@/components/delete-worker-dialog";

const ManageUsers = () => {
  const [data, setData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedWorker, setSelectedWorker] = useState<UserType | null>(null);
  const [workerToDelete, setWorkerToDelete] = useState<UserType | null>(null);
  const [newWorker, setNewWorker] = useState({ Ime: "", Prezime: "", Email: "" });

  const handleSelectWorkerToDelete = (user: UserType) => {
    setWorkerToDelete(user);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://localhost:7206/api/Korisnik");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const usersList = await response.json();
        setData(usersList);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);

  const handleModifyWorker = (worker: UserType) => {
    setSelectedWorker(worker);
  };

  const handleClose = () => {
    setSelectedWorker(null);
    setWorkerToDelete(null);
  };

  const handleCreateWorker = async () => {
    try {
      const response = await fetch(`https://localhost:7206/api/Korisnik/5?Ime=${newWorker.Ime}&Prezime=${newWorker.Prezime}&Email=${newWorker.Email}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const createdWorker = await response.json();
      setData((prevData) => [...prevData, createdWorker]);
      handleClose();
    } catch (error) {
      console.error("Failed to create worker:", error);
    }
  };

  const table = useReactTable({
    data,
    columns: columns(handleModifyWorker, handleSelectWorkerToDelete),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  if (loading) {
    return (
      <div className="w-full p-10">
        <h1 className="text-3xl mb-1 flex">
          <UsersIcon className="w-8 h-8 mr-2" />
          Manage Workers
        </h1>
        <p className="text-[#505050]">View, modify and delete workers.</p>
        <div className="flex items-center py-4">
          <Skeleton className="max-w-sm h-10" />
          <Skeleton className="w-32 h-10" />
          <Skeleton className="ml-5 w-32 h-10" />
        </div>
        <Skeleton className="mb-5 w-full h-24" />
        <Skeleton className="mb-5 w-full h-24" />
        <Skeleton className="mb-5 w-full h-24" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }

  return (
    <div className="w-full p-10">
      <h1 className="text-3xl mb-1 flex">
        <UsersIcon className="w-8 h-8 mr-2" />
        Manage Workers
      </h1>
      <p className="text-[#505050]">View, modify and delete workers.</p>
      <div className="flex items-center py-4 mb-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mb-0"
        />
        <Dialog>
          <DialogTrigger className="rounded-full ml-4 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-blue-400 text-white hover:bg-blue-800 h-10 px-4 py-2">
            <UserPlus2Icon />
            Create new worker
          </DialogTrigger>
          <DialogContent className="w-auto h-auto">
            <DialogHeader>
              <DialogTitle>Create New Worker</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new worker.
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Email"
              value={newWorker.Email}
              onChange={(e) => setNewWorker({ ...newWorker, Email: e.target.value })}
            />
            <Input
              placeholder="First Name"
              value={newWorker.Ime}
              onChange={(e) => setNewWorker({ ...newWorker, Ime: e.target.value })}
            />
            <Input
              placeholder="Last Name"
              value={newWorker.Prezime}
              onChange={(e) => setNewWorker({ ...newWorker, Prezime: e.target.value })}
            />
            <DialogFooter>
              <Button className="rounded-full" variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="rounded-full bg-blue-400" onClick={handleCreateWorker}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} row(s) found.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {workerToDelete && (
        <DeleteWorkerDialog workerToDelete={workerToDelete} onClose={handleClose} />
      )}
      {selectedWorker && (
        <UpdateWorkerCard user={selectedWorker} onClose={handleClose} />
      )}
    </div>
  );
};

export default ManageUsers;
