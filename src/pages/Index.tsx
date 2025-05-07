import Layout from "@/components/layout/Layout";
import { WelcomeGreeting } from "@/components/home/WelcomeGreeting";
import { StatGrid } from "@/components/home/StatGrid";
import { GettingStartedTips } from "@/components/home/GettingStartedTips";
import { RecentActivity } from "@/components/home/RecentActivity";
import { RecentTransactions } from "@/components/home/RecentTransactions";

const Index = () => {
  return (
    <Layout title="Welcome, Marina!" userName="Marina" userSurname="Neumann">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <WelcomeGreeting userName="Marina" userSurname="Neumann" />
        </div>
        
        <StatGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <GettingStartedTips />
          </div>
        </div>
        <RecentTransactions />
      </div>
    </Layout>
  );
};

export default Index;
