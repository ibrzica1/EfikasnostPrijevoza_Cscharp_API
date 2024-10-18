import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import CiklicnaService from "../../services/CiklicnaService";

export default function CiklicnaPregled() {
    const [ciklicnaData, setCiklicnaData] = useState([]); 
    const [a, setA] = useState(2);  
    const [b, setB] = useState(2);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchData() {
        setLoading(true);
        setError(null);  
        try {
            const data = await CiklicnaService.getCiklicnaData(a, b);
            console.log("API Response:", data);
            if (Array.isArray(data)) {
                setCiklicnaData(data);
            } else {
                throw new Error("Data is not in array format.");
            }
        } catch (error) {
            console.error("Error fetching data", error);
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
    };

    return (
        <Container>
            <h2>Ciklicna Tablica</h2>
            
            <Form onSubmit={handleSubmit} className="mb-3">
                <Form.Group className="mb-2">
                    <Form.Label>Redak (a):</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={a} 
                        onChange={(e) => setA(parseInt(e.target.value))} 
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Stupac (b):</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={b} 
                        onChange={(e) => setB(parseInt(e.target.value))} 
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Fetch Data</Button>
            </Form>

            {loading && <p>Loading...</p>}

            {error && <p className="text-danger">{error}</p>}

            {ciklicnaData.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Broj</th>
                            <th>Boja</th>
                            <th>Gore</th>
                            <th>Dolje</th>
                            <th>Lijevo</th>
                            <th>Desno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ciklicnaData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.broj}</td>
                                <td>{item.boja}</td>
                                <td>{item.gore ? "True" : "False"}</td>
                                <td>{item.dolje ? "True" : "False"}</td>
                                <td>{item.lijevo ? "True" : "False"}</td>
                                <td>{item.desno ? "True" : "False"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {!loading && ciklicnaData.length === 0 && !error && (
                <p>No data available. Please enter values for a and b to fetch data.</p>
            )}
        </Container>
    );
}
