import React, { useState } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import { Container, Typography } from "@mui/material";

const App = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                E-Commerce Product Management
            </Typography>
            <AddProduct refresh={() => setRefresh(!refresh)} />
            <ProductList key={refresh} />
        </Container>
    );
};

export default App;
