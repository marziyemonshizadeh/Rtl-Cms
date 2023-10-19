const AddNewProduct: React.FC = () => {
  return (
    <div className="p-3">
      <h1 className="font-extrabold font-serif md:text-4xl text-xl my-2">
        افزودن محصول جدید
      </h1>
      <div className="card min-h-64 pt-5">
        <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-5">
          <input
            className="appearance-none border-none  bg-gray-200 font-bold h-10 text-gray-600 mr-3 py-1 px-2 leading-tight rounded-lg focus:border-lime-300"
            type="text"
            placeholder="اسم محصول خود را بنویسید  "
            aria-label="Full name"
          />
          <input
            className="appearance-none border-none  bg-gray-200 font-bold h-10 text-gray-600 mr-3 py-1 px-2 leading-tight rounded-lg focus:border-lime-300"
            type="text"
            placeholder="قیمت محصول خود را بنویسید  "
            aria-label="Full name"
          />
          <input
            className="appearance-none border-none  bg-gray-200 font-bold h-10 text-gray-600 mr-3 py-1 px-2 leading-tight rounded-lg focus:border-lime-300"
            type="text"
            placeholder="موجودی محصول خود را بنویسید  "
            aria-label="Full name"
          />
          <input
            className="appearance-none border-none  bg-gray-200 font-bold h-10 text-gray-600 mr-3 py-1 px-2 leading-tight rounded-lg focus:border-lime-300"
            type="text"
            placeholder="آدرس عکس محصول خود را بنویسید  "
            aria-label="Full name"
          />
        </div>
        <div className="flex justify-end mt-3">
          <button
            type="button"
            className="font-extrabold bg-lime-500 text-slate-50 p-1 rounded-md"
          >
            ثبت محصول
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
