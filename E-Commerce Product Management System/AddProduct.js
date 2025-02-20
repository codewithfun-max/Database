import React, { useState } from "react";
import { addProduct } from "../services/api";
import { TextField, Button, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddProduct = ({ refresh }) => {
    const [product, setProduct] = useState({ name: "", description: "", price: "", category: "", stock: "" });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addProduct(product);
        refresh();
    };

    return (
        <Paper sx={{ padding: "20px", marginBottom: "20px", maxWidth: "500px", margin: "auto" }}>
            <Typography variant="h5" gutterBottom>
                Add New Product
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <TextField label="Name" name="name" onChange={handleChange} required fullWidth />
                <TextField label="Description" name="description" onChange={handleChange} required fullWidth multiline rows={2} />
                <TextField label="Price" type="number" name="price" onChange={handleChange} required fullWidth />
                <TextField label="Category" name="category" onChange={handleChange} required fullWidth />
                <TextField label="Stock" type="number" name="stock" onChange={handleChange} required fullWidth />
                <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>
                    Add Product
                </Button>
            </form>
        </Paper>
    );
};

export default AddProduct;
