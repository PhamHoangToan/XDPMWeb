import  { useEffect, useState } from "react";
import { Lock, Headset, Truck, Sprout  } from 'lucide-react';
import { fetchRandomProducts } from "../api";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const features = [
        { icon: <Lock size={32}/>, title: "Secure payment", desc: "Payment with security" },
        { icon: <Sprout size={32} />, title: "100% organic", desc: "Available Quality Foods" },
        { icon: <Headset size={32} />, title: "Customer support", desc: "Very helpful support 24/7" },
        { icon: <Truck size={32} />, title: "Free shipping", desc: "All orders over $100" },
    ];
    const categories = [
        { name: "Bánh kem Noel", img: "/upload/14-scaled.jpeg" },
        { name: "Bánh nướng", img: "/upload/Bong-Lan-Sua-2.jpg" },
        { name: "Bánh Mouse", img: "/upload/mix-2-vi-mau-sung-tuc-scaled.jpg.png" },
        { name: "Bông lan trứng muối", img: "/upload/banh-bltm-viet-quat.webp" },
    ];
    const [randomProducts, setRandomProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            const products = await fetchRandomProducts();
            setRandomProducts(products);
        };
        loadProducts();
    }, []);
    return (
        <>
            <div className="home">
                <div className="content">
                    <h3>Tạo nên khoảnh khắc</h3>
                    <h3>Gói trọn yêu thương !</h3>
                    <a href="#" className="content-btn" onClick={() => navigate(`/products/`)}>Order Now</a>
                </div>
                <div className="img">
                    <img src="/a.jpg" alt="" />
                </div>
            </div>
            <section className="why-choose-us">
                <h2>Why choose us</h2>
                <p className="subheading">GREAT QUALITY</p>
                <div className="features">
                    {features.map((feature, index) => (
                        <div key={index} className="feature">
                            <div className="features-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            <div className="categories">
                <h2>Explore Our Cake</h2>
                <div className="container">
                    <div className="row justify-content-center">
                        {categories.map((item, index) => (
                            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="box">
                                    <img src={item.img} alt={item.name} className="img-fluid" />
                                    <a href="#" className="btn">{item.name}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="random-products">
                <h2>Discover Delicious Cakes</h2>
                <div className="container">
                    <div className="row justify-content-center">
                        {randomProducts.map((item) => (
                            <div key={item.product_id} className="col-lg-3 col-md-6 col-sm-6 col-11 mb-4">
                                <div className="box" onClick={() => navigate(`/products/${item.product_id}`)}>
                                    <img src={`/upload/${item.image}`} alt={item.product_name} className="img-fluid"  />
                                    <h3>{item.product_name}</h3>
                                    <p className="price">{item.price} đ</p>   
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/products")}>See More</button>
            </div>
        </>
    );
};
export default Home;
