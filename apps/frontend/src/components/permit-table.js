"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermitTable = PermitTable;
const react_1 = require("@tremor/react");
function PermitTable({ permits, showAll = false }) {
    const displayPermits = showAll ? permits : permits.slice(0, 10);
    const getStatusColor = (status) => {
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
        return (<react_1.Card>
        <react_1.Title>Permit Data</react_1.Title>
        <div className="text-center py-8 text-gray-500">
          No permit data available
        </div>
      </react_1.Card>);
    }
    return (<react_1.Card>
      {!showAll && <react_1.Title className="mb-4">Recent Permits</react_1.Title>}
      
      <react_1.Table>
        <react_1.TableHead>
          <react_1.TableRow>
            <react_1.TableHeaderCell>Permit ID</react_1.TableHeaderCell>
            <react_1.TableHeaderCell>Type</react_1.TableHeaderCell>
            <react_1.TableHeaderCell>Address</react_1.TableHeaderCell>
            <react_1.TableHeaderCell>Status</react_1.TableHeaderCell>
            <react_1.TableHeaderCell>Date</react_1.TableHeaderCell>
          </react_1.TableRow>
        </react_1.TableHead>
        <react_1.TableBody>
          {displayPermits.map((permit) => (<react_1.TableRow key={permit.id}>
              <react_1.TableCell className="font-mono text-sm">
                {permit.id}
              </react_1.TableCell>
              <react_1.TableCell>
                <div className="max-w-32 truncate">
                  {permit.permitType || 'N/A'}
                </div>
              </react_1.TableCell>
              <react_1.TableCell>
                <div className="max-w-48 truncate">
                  {permit.streetNumber} {permit.streetName}
                </div>
              </react_1.TableCell>
              <react_1.TableCell>
                <react_1.Badge color={getStatusColor(permit.currentStatus)}>
                  {permit.currentStatus || 'Unknown'}
                </react_1.Badge>
              </react_1.TableCell>
              <react_1.TableCell className="text-sm text-gray-600">
                {permit.applicationCreationDate ?
                new Date(permit.applicationCreationDate).toLocaleDateString() :
                'N/A'}
              </react_1.TableCell>
            </react_1.TableRow>))}
        </react_1.TableBody>
      </react_1.Table>

      {!showAll && permits.length > 10 && (<div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Showing 10 of {permits.length} permits
          </p>
        </div>)}
    </react_1.Card>);
}
