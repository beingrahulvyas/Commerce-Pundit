import React, { useEffect, useState } from 'react';
import { rand } from '../../utils/randomValue';
import ProductDropdown from '../ProductDropdown';

const products = {
    product_A: {
        name: 'ColorPaint',
        colors: ['red', 'green', 'blue'],
        price: 35,
    },
    product_B: {
        name: 'PaintBrush',
        size: ['small', 'medium', 'large'],
        price: 10,
    }
};

const ColorDropdown = ({ product, onChange, updatedValue }) => {
    return (
        <select onChange={onChange} value={updatedValue && updatedValue}>
            {
                products[product].colors ? products[product].colors.map(value => (
                    <option key={rand()} value={value}>{value}</option>
                )) : products[product].size.map(value => (
                    <option key={rand()} value={value}>{value}</option>
                ))
            }
        </select>
    );
}

const AddNewOrder = ({ onSubmit }) => {
    const [productFields, setProductFields] = useState([
        rand(),
        rand()
    ]);
    const [formData, setFormData] = useState({
        id: rand(),
        name: '',
        products: {

        },
        urgent: true,
        total: 0
    });

    const addMoreProduct = (e) => {
        e.preventDefault();
        setProductFields([
            ...productFields,
            rand()
        ]);
    };

    const onProductChange = (e, value) => {
        setFormData({
            ...formData,
            products: {
                ...formData.products,
                [value]: {
                    id: e.target.value,
                    name: products[e.target.value].name,
                    price: products[e.target.value].price,
                }
            },
        });
    }

    const onColorChange = (e, value, type) => {
        setFormData({
            ...formData,
            products: {
                ...formData.products,
                [value]: {
                    ...formData.products[value],
                    type,
                    value: e.target.value
                }
            }
        })
    }

    useEffect(() => {
        if (Object.keys(formData.products).length !== 0) {
            let total = 0;
            Object.keys(formData.products).forEach(value => {
                total = total + formData.products[value].price
            })
            setFormData({
                ...formData,
                total,
            });
        }
    }, [formData.products]);

    const onFormSubmission = (e) => {
        e.preventDefault();
        if (localStorage.getItem('orders')) {
            let updateOrder = JSON.stringify([
                ...JSON.parse(localStorage.getItem('orders')),
                formData
            ]);
            localStorage.setItem('orders', updateOrder);
        } else {
            let updateOrder = JSON.stringify([formData]);
            localStorage.setItem('orders', updateOrder);
        }

        onSubmit();
    }

    return (
        <form>
            <input
                type='text'
                placeholder='first name'
                name={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <select
                value={formData.urgent}
                onChange={(e) => setFormData({ ...formData, urgent: e.target.value })}>
                <option value={true}>Urgent</option>
                <option value={false}>Non Urgent</option>
            </select>
            {
                productFields && productFields.length !== 0 && productFields.map((value, index) => {
                    return (
                        <>
                            <ProductDropdown
                                key={value}
                                updatedValue={formData.products[value] && formData.products[value].id}
                                onChange={(e) => onProductChange(e, value)}
                                products={products} />
                            {
                                formData.products[value] ?
                                    <ColorDropdown
                                        onChange={(e) =>
                                            onColorChange(e, value, formData.products[value].id === 'product_A' ? 'color' : 'size')}
                                        updatedValue={formData.products[value].value && formData.products[value].value}
                                        product={formData.products[value].id} /> : null
                            }
                        </>
                    )
                })
            }
            <p>Total: {formData.total}</p>
            <button onClick={addMoreProduct}>Add More</button>
            <button type="submit" onClick={onFormSubmission}>Submit</button>
        </form>
    );
}

export default AddNewOrder;