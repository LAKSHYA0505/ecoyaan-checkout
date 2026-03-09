interface CartItemProps {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
  editable?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}

export default function CartItem({
  product_name,
  product_price,
  quantity,
  image,
  editable = false,
  onAdd,
  onRemove,
}: CartItemProps) {
  const showControls = editable && (onAdd || onRemove);

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      {/* Product Image */}
      <img
        src={image}
        alt={product_name}
        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
      />

      {/* Product Details */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{product_name}</p>

        {showControls ? (
          <div className="mt-2 inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-2 py-1">
            <button
              type="button"
              onClick={() => onRemove && onRemove()}
              className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 text-sm leading-none hover:bg-gray-100 disabled:opacity-40"
              disabled={!onRemove || quantity <= 1}
            >
              −
            </button>
            <span className="min-w-[2rem] text-center text-xs font-medium text-gray-700">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onAdd && onAdd()}
              className="w-6 h-6 flex items-center justify-center rounded-full border border-green-600 bg-green-600 text-white text-sm leading-none hover:bg-green-700 disabled:opacity-40"
              disabled={!onAdd}
            >
              +
            </button>
          </div>
        ) : (
          <p className="text-xs text-gray-500 mt-1">Qty: {quantity}</p>
        )}

        <p className="text-sm font-semibold text-green-700 mt-2">
          ₹{product_price} x {quantity}
        </p>
      </div>

      {/* Line Total */}
      <div className="text-right">
        <p className="text-sm font-bold text-gray-800">
          ₹{product_price * quantity}
        </p>
      </div>
    </div>
  );
}