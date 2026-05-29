import type { LucideProps } from "lucide-react";
import {
  Rat, Bug, BedDouble, Droplets, Wind, ShieldCheck,
  UtensilsCrossed, Hotel, Factory, HeartPulse, Warehouse, Home,
  Search, ClipboardList, Wrench, BarChart3,
  Award, FileCheck, Leaf, Clock,
  Binoculars, Feather, Zap, Building2,
} from "lucide-react";

type IconComponent = React.ComponentType<LucideProps>;

const icons: Record<string, IconComponent> = {
  Rat, Bug, BedDouble, Droplets, Wind, ShieldCheck,
  UtensilsCrossed, Hotel, Factory, HeartPulse, Warehouse, Home,
  Search, ClipboardList, Wrench, BarChart3,
  Award, FileCheck, Leaf, Clock,
  Binoculars, Feather, Zap, Building2,
};

interface LucideIconProps extends LucideProps {
  name: string;
}

export default function LucideIcon({ name, ...props }: LucideIconProps) {
  const Icon: IconComponent = icons[name] ?? Bug;
  return <Icon {...props} />;
}
