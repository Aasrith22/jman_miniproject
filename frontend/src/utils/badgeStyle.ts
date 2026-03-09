export const badgeStyle = (badge: string) => {
    if (badge === "Completed")
      return "bg-emerald-400/15 text-emerald-400 border border-emerald-400/30";
  
    if (badge === "Just Started")
      return "bg-amber-400/15 text-amber-400 border border-amber-400/30";
  
    return "bg-sky-400/15 text-sky-400 border border-sky-400/30";
  };