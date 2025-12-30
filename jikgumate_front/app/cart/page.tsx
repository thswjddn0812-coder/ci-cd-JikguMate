export default function CartPage() {
  // 백엔드에서 데이터를 가져올 예정
  const cartItems: any[] = [];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">장바구니</h1>
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="w-24 h-24 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <p className="text-xl text-gray-600 mb-2">장바구니가 비어있습니다</p>
          <p className="text-gray-400">상품을 장바구니에 담아보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">장바구니</h1>
      
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-6 bg-white flex items-center gap-6 hover:shadow-md transition-shadow"
          >
            <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-gray-400 text-sm">{item.image}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {item.name}
              </h3>
              <div className="flex items-center gap-4 text-gray-600">
                <span>수량: {item.quantity}</span>
                <span>단가: {item.price.toLocaleString()}원</span>
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {(item.price * item.quantity).toLocaleString()}원
            </div>
            <button
              className="text-red-500 hover:text-red-700 transition-colors px-4"
              aria-label="삭제"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex justify-end">
          <div className="w-full max-w-md space-y-4">
            <div className="flex justify-between text-lg text-gray-700">
              <span>총 상품 금액</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-lg text-gray-700">
              <span>배송비</span>
              <span>3,000원</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4 border-t border-gray-200">
              <span>총 결제 금액</span>
              <span>{(totalPrice + 3000).toLocaleString()}원</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg mt-6">
              주문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

