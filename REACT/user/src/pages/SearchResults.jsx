import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchProducts } from "../api";

const SearchResults = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        const res = await searchProducts(query);

        console.log("Kết quả tìm kiếm từ API:", res);

        if (res.success && res.data) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tìm kiếm:", error);
        setProducts([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="products container">
      <h2>Kết quả tìm kiếm: {query}</h2>

      <div className="row">
        <div className="col-md-12">
          <div className="container">
            {products.length > 0 ? (
              <div className="row justify-content-center">
                {products.map((product) => (
                  <div
                    key={product.product_id}
                    className="col-lg-3 col-md-6 col-sm-6 mb-4"
                  >
                    <div
                      className="box"
                      onClick={() => navigate(`/products/${product.product_id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`/upload/${product.image}`}
                        className="img-fluid"
                        alt={product.product_name}
                      />
                      <h3>{product.product_name}</h3>
                      <p className="price">
                        {parseInt(product.price).toLocaleString("vi-VN")} đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted">
                Không có sản phẩm phù hợp.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
