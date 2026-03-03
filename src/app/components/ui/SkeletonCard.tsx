import { motion } from 'framer-motion';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard(props: SkeletonCardProps) {
  const { className = "" } = props;
  
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-neutral-200 ${className}`}>
      <div className="aspect-square bg-neutral-200 relative overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition, duration: ={{ repeat: Infinity1.5, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>

      <div className="p-5 space-y-3">
        <div className="h-6 bg-neutral-200 rounded-lg w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded w-full" />
          <div className="h-4 bg-neutral-200 rounded w-2/3" />
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-neutral-200 rounded w-1/2" />
          <div className="h-3 bg-neutral-200 rounded w-1/3" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mt-4">
          <div className="h-8 bg-neutral-200 rounded-lg w-24" />
          <div className="h-10 bg-neutral-200 rounded-xl w-28" />
        </div>
    </div>
  );
}

export function ProductSkeletonGrid(props: { count?: number }) {
  const count = props.count || 6;
  const items = [];
  
  for (let i = 0; i < count; i++) {
    items.push(<SkeletonCard key={i} />);
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items}
    </div>
  );
}
</parameter>
</create_file>
