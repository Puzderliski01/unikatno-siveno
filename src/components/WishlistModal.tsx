import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'motion/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Product } from '../types';
import { FORMAT_RSD } from '../data/products';

interface WishlistModalProps {
  isOpen: boolean;
  wishlistProducts: Product[];
  onClose: () => void;
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  onReorder?: (products: Product[]) => void;
}

function SortableItem({
  product,
  onRemove,
  onMoveToCart,
  onOpenDetails,
  onClose,
}: {
  key?: string;
  product: Product;
  onRemove: () => void;
  onMoveToCart: () => void;
  onOpenDetails: () => void;
  onClose: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 'auto' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3.5 bg-[#111111] border flex items-center gap-4 transition-colors shadow-sm ${
        isDragging ? 'border-[#c9a96e]/60 shadow-lg' : 'border-[#e8e0d4]/15 hover:border-[#c9a96e]'
      }`}
    >
      {/* Drag Handle */}
      <button
        type="button"
        className="p-1 text-[#e8e0d4]/30 hover:text-[#c9a96e] cursor-grab active:cursor-grabbing transition-colors touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4" />
      </button>

      <img
        src={product.images[0]}
        alt={product.nameSr}
        className="w-16 h-20 object-cover border border-[#e8e0d4]/10 flex-shrink-0 cursor-pointer"
        onClick={() => {
          onClose();
          onOpenDetails();
        }}
      />

      <div className="flex-1 min-w-0">
        <h4
          className="font-serif-luxury text-base text-[#e8e0d4] hover:text-[#c9a96e] cursor-pointer truncate"
          onClick={() => {
            onClose();
            onOpenDetails();
          }}
        >
          {product.nameSr}
        </h4>
        <p className="text-[11px] text-[#e8e0d4]/70 line-clamp-1">{product.subtitleSr}</p>
        <div className="font-mono text-xs font-semibold text-[#c9a96e] mt-1">
          {FORMAT_RSD(product.priceRSD)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMoveToCart}
          className="p-2.5 bg-[#0a0a0a] hover:bg-[#1a1a1a] text-[#e8e0d4] font-semibold text-xs flex items-center gap-1.5 transition-colors"
          title="Dodaj u korpu"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#c9a96e]" />
          <span className="hidden sm:inline">U korpu</span>
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="p-2.5 hover:bg-[#0a0a0a]/5 text-[#e8e0d4]/40 hover:text-rose-600 transition-colors"
          title="Ukloni iz liste želja"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  wishlistProducts,
  onClose,
  onRemoveFromWishlist,
  onMoveToCart,
  onOpenDetails,
  onReorder,
}) => {
  const [items, setItems] = useState<Product[]>(wishlistProducts);

  // Sync items when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setItems(wishlistProducts);
    }
  }, [isOpen, wishlistProducts]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex((p) => p.id === active.id);
      const newIndex = prev.findIndex((p) => p.id === over.id);
      const reordered = arrayMove(prev, oldIndex, newIndex);
      onReorder?.(reordered);
      return reordered;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      id="wishlist-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm font-sans"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-[#111111] border border-[#e8e0d4]/20 shadow-2xl overflow-hidden text-[#e8e0d4] my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#e8e0d4]/10 bg-[#111111] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#c9a96e] fill-[#c9a96e]" />
            <h3 className="font-serif-luxury text-lg text-[#e8e0d4]">
              Vaša lista želja ({items.length})
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {items.length > 1 && (
              <span className="text-[10px] text-[#e8e0d4]/40 uppercase tracking-wider font-sans hidden sm:inline">
                Prevucite za redosled
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-[#0a0a0a]/5 text-[#e8e0d4] transition-colors"
              aria-label="Zatvori listu želja"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-[#e8e0d4]/20 mx-auto mb-3" />
              <p className="font-serif-luxury text-lg text-[#e8e0d4] mb-2">Vaša lista želja je prazna</p>
              <p className="text-xs text-[#e8e0d4]/60 max-w-xs mx-auto mb-6">
                Kliknite na ikonu srca na bilo kom modelu kako biste ga sačuvali za kasnije razgledanje ili probu.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0a0a0a] hover:bg-[#1a1a1a] text-[#e8e0d4] font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                Pregledaj kolekciju
              </button>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {items.map((product) => (
                    <SortableItem
                      key={product.id}
                      product={product}
                      onRemove={() => onRemoveFromWishlist(product)}
                      onMoveToCart={() => onMoveToCart(product)}
                      onOpenDetails={() => {
                        onClose();
                        onOpenDetails(product);
                      }}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </motion.div>
    </div>
  );
};
