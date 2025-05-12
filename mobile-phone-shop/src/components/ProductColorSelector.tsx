import React from 'react';
import { ColourOption } from '../types';
import './ProductColorSelector.css';

interface ProductColorSelectorProps {
    colors: ColourOption[];
    selectedColor: ColourOption | null;
    onColorSelect: (color: ColourOption) => void;
}

const ProductColorSelector: React.FC<ProductColorSelectorProps> = ({
                                                                       colors,
                                                                       selectedColor,
                                                                       onColorSelect,
                                                                   }) => {
    return (
        <div className="color-selector-container">
            <div className="color-dropdown">
                <div className="selected-color">
                    <div
                        className="color-circle"
                        style={{ backgroundColor: `#${selectedColor?.hex || colors[0].hex}` }}
                    ></div>
                    <span>{selectedColor?.name || colors[0].name}</span>
                    <span className="dropdown-arrow">▼</span>
                </div>

                <div className="color-options">
                    {colors.map((color) => (
                        <div
                            key={color.name}
                            className={`color-option ${selectedColor?.name === color.name ? 'selected' : ''}`}
                            onClick={() => onColorSelect(color)}
                        >
                            <div
                                className="color-circle"
                                style={{ backgroundColor: `#${color.hex}` }}
                            ></div>
                            <span>{color.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductColorSelector;