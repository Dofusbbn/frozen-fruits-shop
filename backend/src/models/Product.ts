import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stockLevel: number;
  category: string;
  imageUrl?: string;
  sku: string;  // Stock Keeping Unit
  lastUpdated: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  stockLevel: { 
    type: Number, 
    required: true,
    min: 0,
    default: 0 
  },
  category: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String 
  },
  sku: { 
    type: String, 
    required: true,
    unique: true 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Update lastUpdated timestamp before saving
productSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

export default mongoose.model<IProduct>('Product', productSchema); 