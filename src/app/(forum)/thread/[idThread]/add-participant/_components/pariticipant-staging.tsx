"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useContext } from "react";
import { type Users, type StrukturOrganisasi } from "@/models/schema";
import { ParticipantContext } from "./participant-content";

export function ParticipantStaging() {
  const context = useContext(ParticipantContext);

  console.log(context?.participant);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Kode Kantor</TableHead>
          <TableHead>Jabatan</TableHead>
          <TableHead>Unit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow> */}

        {context?.participant.map((item) => (
          <TableRow key={item.uuid}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.kdKantor}</TableCell>
            <TableCell>{item.jabatan}</TableCell>
            <TableCell>{item.unitkerja}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
