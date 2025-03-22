export type Category = "dining" | "shopping" | "travel" | "grocery";

const getCategoryColor = (category: Category) => {
  switch (category) {
    case "dining":
      return "bg-amber-500";
    case "shopping":
      return "bg-purple-500";
    case "travel":
      return "bg-blue-500";
    case "grocery":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export { getCategoryColor };
