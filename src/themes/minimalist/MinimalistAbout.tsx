import { usePortfolio } from "@/contexts/PortfolioDataContext";
import { motion } from "framer-motion";

const MinimalistAbout = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {personalInfo.name}
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          {personalInfo.subtitle}
        </p>
      </div>
);
};

export default MinimalistAbout;
