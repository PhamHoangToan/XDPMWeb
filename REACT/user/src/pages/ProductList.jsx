import  { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "../api";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  // Lọc sản phẩm theo danh mục
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.cate_id === selectedCategory)
    : products;

  return (
    <div className="products container">
      {/* Danh mục bên trái */}
      {/* <div className="category-box">
            <h3 className="category-title">Danh mục</h3>
            <ul className="category-list">
              {categories.map((category) => (
                <li key={category.category_id}
                  className={`category-item ${selectedCategory === category.category_id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category.category_id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div> */}

      <div className="category-box">
        <ul className="category-list">
          {categories.map((category) => (
            <li
              key={category.category_id}
              className={`category-item ${selectedCategory === category.category_id ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.category_id)}
            >
              {category.name}
               <span className="underline"></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sản phẩm bên phải */}
        <div className="container">
          {filteredProducts.length > 0 ? (
            <div className="row justify-content-center">
              {filteredProducts.map((product) => (
                <div key={product.product_id} className="col-lg-3 col-md-6 col-sm-6 mb-4">
                  <div className="box" >
                    <img
                      src={`/upload/${product.image}`}
                      className="img-fluid"
                      alt={product.product_name}
                      onClick={() => {
                        console.log("Chuyển trang đến:", product.product_id);
                        navigate(`/products/${product.product_id}`);
                      }}
                    />
                    <h3
                      onClick={() => {
                        console.log("Chuyển trang đến:", product.product_id);
                        navigate(`/products/${product.product_id}`);
                      }}
                    >
                      {product.product_name}
                    </h3>

                    <p className="price">{product.price} đ</p>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">Không có sản phẩm nào.</p>
          )}
        </div>
      </div>
  );
};

export default ProductList;
