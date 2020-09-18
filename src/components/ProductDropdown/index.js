import React from 'react';
import { rand } from '../../utils/randomValue';

const ProductDropdown = ({ onChange, updatedValue, products }) => {
    return (
        <select onChange={onChange} value={updatedValue && updatedValue}>
            {
                Object.keys(products).map(value => {
                    return (
                        <option key={rand()} value={value}>{value}</option>
                    )
                })
            }
        </select>
    );
}

export default ProductDropdown;