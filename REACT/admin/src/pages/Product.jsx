import { useState } from "react";
import { Link } from "react-router-dom";

const mockProducts = [
    {
        product_id: 1,
        product_name: "Bánh Bông Lan Trứng Muối Việt Quất",
        price: "350.000",
        image: "banh-bong-lan.jpg"
    },
    {
        product_id: 2,
        product_name: "Bánh Croissant Trứng Muối",
        price: "20.000",
        image: "banh-croissant.jpg"
    },
    {
        product_id: 3,
        product_name: "Bánh Mousse Chocolate",
        price: "150.000",
        image: "banh-mousse.jpg"
    }
];

const Product = () => {
    const [products, setProducts] = useState(mockProducts);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredProducts = mockProducts.filter(product =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filteredProducts);
    };

    const handleDelete = (productId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
        if (confirmDelete) {
            setProducts(products.filter(product => product.product_id !== productId));
        }
    };

    return (
        <div >
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Tìm kiếm</button>
            </form>
            <div className="product-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="product-card" key={product.product_id}>
                            <img src={`/public/${product.image}`} alt="Hình ảnh sản phẩm" />
                            <h2>{product.product_name}</h2>
                            <div className="product-price">{product.price} VND</div>
                            <Link to={`/product-edit/${product.product_id}`} className="detail-button">Edit</Link>
                            <Link onClick={() => handleDelete(product.product_id)} className="detail-button">Delete</Link>
                            <Link to={`/product-detail/${product.product_id}`} className="detail-button">View</Link>
                        </div>
                    ))
                ) : (
                    <p>Không tìm thấy sản phẩm nào.</p>
                )}
            </div>
        </div>
    );
};

export default Product;
