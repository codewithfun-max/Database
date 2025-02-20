import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        fetchProducts();
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {product.name}
                                </Typography>
                                <Typography color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: "bold", marginTop: 1 }}>
                                    ${product.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: {product.category}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Stock: {product.stock}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(product.id)}
                                    sx={{ marginTop: 2 }}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ProductList;
