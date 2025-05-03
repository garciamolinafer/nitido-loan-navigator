
import Layout from "@/components/layout/Layout";
import { AppsIntegrationHub } from "@/components/apps/AppsIntegrationHub";

const Apps = () => {
  return (
    <Layout title="Apps Setup">
      <div className="max-w-7xl mx-auto">
        <AppsIntegrationHub />
      </div>
    </Layout>
  );
};

export default Apps;
