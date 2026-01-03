"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface LoadMoreButtonProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export default function LoadMoreButton({ hasMore, isLoading, onLoadMore }: LoadMoreButtonProps) {
  const { t } = useLanguage();

  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-12">
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        variant="outline"
        size="lg"
        className="rounded-full px-8 h-14 font-bold uppercase tracking-widest text-xs border-2 hover:bg-primary hover:text-white hover:border-primary transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          t('shop.loadMore') || 'Load More'
        )}
      </Button>
    </div>
  );
}
