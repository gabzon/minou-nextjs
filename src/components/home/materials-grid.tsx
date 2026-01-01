const MATERIALS = [
  {
    name: "Polymer Clay",
    color: "bg-accent-blush",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "UV Resin",
    color: "bg-accent-mint",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Gold Plated",
    color: "bg-accent-butter",
    image: "https://images.unsplash.com/photo-1610332463287-99a38048225e?auto=format&fit=crop&q=80&w=200",
  },
];

export function MaterialsGrid() {
  return (
    <section className="py-6 bg-card dark:bg-card my-4">
      <div className="px-4 mb-5">
        <h2 className="text-xl font-bold tracking-tight">Shop by Material</h2>
      </div>
      <div className="flex justify-around px-4">
        {MATERIALS.map((material) => (
          <div key={material.name} className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className={`w-20 h-20 rounded-full ${material.color} overflow-hidden p-1 shadow-sm ring-2 ring-transparent group-hover:ring-primary/50 transition-all`}>
              <div 
                className="w-full h-full rounded-full bg-cover bg-center"
                role="img"
                aria-label={material.name}
                style={{ backgroundImage: `url("${material.image}")` }}
              />
            </div>
            <span className="text-xs font-bold">{material.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
