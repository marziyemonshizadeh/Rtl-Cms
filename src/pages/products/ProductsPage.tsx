import React, { useEffect } from "react";
import AddNewProduct from "@/components/addNewProduct/addNewProduct";
import DataTable, { type DataTableColumn } from "@/components/@base/Table/DataTable";
import ProductActions from "@/components/product/product";
import type Product from "@/models/productType";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProduct } from "@/redux/store/products";

const columns: DataTableColumn<Product>[] = [
  {
    id: "image",
    header: "عکس",
    render: (product) => (
      <img src={product.img} alt={product.name} className="mx-auto max-h-24 max-w-full rounded object-contain" />
    ),
  },
  { id: "name", header: "اسم", render: (product) => product.name },
  { id: "price", header: "قیمت", render: (product) => `${product.price.toLocaleString()} تومان` },
  { id: "count", header: "موجودی", render: (product) => product.count },
];

const Products: React.FC = () => {
  const data = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <>
      <AddNewProduct />

      <DataTable
        title="لیست محصولات"
        toolbar={!data.loading && !data.error && (
          <span className="text-xs text-muted-foreground">{data.products.length.toLocaleString("fa-IR")} محصول</span>
        )}
        records={data.products}
        columns={columns}
        getRowId={(product) => product.id}
        renderActions={(product) => <ProductActions {...product} />}
        loading={data.loading}
        error={data.error}
        emptyMessage="هیچ محصولی یافت نشد"
        onRetry={() => void dispatch(fetchProduct())}
        retryDisabled={Object.values(data.mutations).some((mutation) => mutation.pending)}
      />
    </>
  );
};

export default Products;
