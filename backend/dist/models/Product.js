"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockLevel: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Product', productSchema);
