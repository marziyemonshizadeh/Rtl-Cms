const AddNewProduct: React.FC = () => {
  return (
    <>
      <h1 className="header">افزودن محصول جدید</h1>
      <div className="card min-h-64 pt-5">
        <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-5">
          <input
            className="input"
            type="text"
            placeholder="اسم محصول خود را بنویسید  "
            aria-label="Full name"
          />
          <input
            className="input"
            type="text"
            placeholder="قیمت محصول خود را بنویسید  "
            aria-label="Full name"
          />
          <input
            className="input"
            type="text"
            placeholder="موجودی محصول خود را بنویسید  "
            aria-label="Full name"
          />
          <input
            className="input"
            type="text"
            placeholder="آدرس عکس محصول خود را بنویسید  "
            aria-label="Full name"
          />
        </div>
        <div className="flex justify-end mt-3">
          <button type="button" className="btn">
            ثبت محصول
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNewProduct;
