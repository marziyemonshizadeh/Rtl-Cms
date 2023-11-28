import { SubmitHandler, useForm } from "react-hook-form";
import apiRequests from "../../services/configs";
// import { useMutation } from "react-query";

type Inputs = {
  name: string;
  img: string;
  price: Number;
  count: string;
};

const AddNewProduct: React.FC = () => {
  // 2  const mutation = useMutation({
  //     mutationFn: (newProduct) => {
  //       return apiRequests.post('/products', newProduct)
  //     },
  // })
  //1  const mutation = useMutation((newProduct)=>{
  //       return apiRequests.post('/products/', newProduct)
  //       }
  //     )
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // const mutation = useMutation(()=>{
    //   return apiRequests.post('/products/', data)
    //   }
    // )
    //1 mutation.mutate({data})

    console.log(data);
    apiRequests.post("/products/", data).then((res) => {
      console.log("get post called");
      return res.data;
    });
  };
  console.log(watch("name")); // watch input value by passing the name of it
  return (
    <>
      <h1 className="header">افزودن محصول جدید</h1>
      <form className="card min-h-64 pt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-2">
          <div className="flex flex-col">
            <input
              // defaultValue="test"
              className="input"
              type="text"
              placeholder="اسم محصول خود را بنویسید  "
              aria-label="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="input"
              type="text"
              placeholder="قیمت محصول خود را بنویسید  "
              aria-label="price"
              {...register("price", { required: true })}
            />
            {errors.img && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="input"
              type="text"
              placeholder="موجودی محصول خود را بنویسید  "
              aria-label="count"
              {...register("count", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="input"
              type="text"
              placeholder="آدرس عکس محصول خود را بنویسید "
              aria-label="img"
              {...register("img", { required: true })}
            />
            {errors.count && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="font-extrabold bg-lime-500 text-slate-50 p-2 select-none rounded-md focus:ring-2 ring-offset-2 ring-lime-700 focus:bg-lime-600"
          >
            ثبت محصول
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNewProduct;
