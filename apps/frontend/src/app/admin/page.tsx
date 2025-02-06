import { Card, Grid, Title } from "@tremor/react";
import { UsersTable } from "./components/users-table";
import { Metrics } from "./components/metrics";
import { auth } from "@clerk/nextjs";

export default async function AdminPage() {
  const { userId } = auth();
  
  if (!userId) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="p-6">
      <Title>Admin Dashboard</Title>
      
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        <Metrics />
      </Grid>

      <Card className="mt-6">
        <UsersTable />
      </Card>
    </div>
  );
} 