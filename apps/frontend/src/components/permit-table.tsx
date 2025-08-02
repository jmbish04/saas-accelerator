"use client";

import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";

interface Permit {
  id: string;
  permitType?: string;
  streetNumber?: string;
  streetName?: string;
  currentStatus?: string;
  applicationCreationDate?: string;
  description?: string;
}

interface PermitTableProps {
  permits: Permit[];
  showAll?: boolean;
}

export function PermitTable({ permits, showAll = false }: PermitTableProps) {
  const displayPermits = showAll ? permits : permits.slice(0, 10);

  const getStatusColor = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'ISSUED':
        return 'green';
      case 'FILED':
        return 'yellow';
      case 'APPROVED':
        return 'blue';
      case 'EXPIRED':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (!permits || permits.length === 0) {
    return (
      <Card>
        <Title>Permit Data</Title>
        <div className="text-center py-8 text-gray-500">
          No permit data available
        </div>
      </Card>
    );
  }

  return (
    <Card>
      {!showAll && <Title className="mb-4">Recent Permits</Title>}
      
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Permit ID</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayPermits.map((permit) => (
            <TableRow key={permit.id}>
              <TableCell className="font-mono text-sm">
                {permit.id}
              </TableCell>
              <TableCell>
                <div className="max-w-32 truncate">
                  {permit.permitType || 'N/A'}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-48 truncate">
                  {permit.streetNumber} {permit.streetName}
                </div>
              </TableCell>
              <TableCell>
                <Badge color={getStatusColor(permit.currentStatus)}>
                  {permit.currentStatus || 'Unknown'}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {permit.applicationCreationDate ? 
                  new Date(permit.applicationCreationDate).toLocaleDateString() : 
                  'N/A'
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!showAll && permits.length > 10 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Showing 10 of {permits.length} permits
          </p>
        </div>
      )}
    </Card>
  );
}