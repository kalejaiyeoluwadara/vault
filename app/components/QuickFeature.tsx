
import { Card, CardContent } from "@/components/ui/card";



interface QuickFeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
  }

export const QuickFeature: React.FC<QuickFeatureProps> = ({ icon, title, description }) => (
    <Card className="hover:shadow-md transition-all duration-300 group">
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center text-blue-600 group-hover:text-blue-800 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );