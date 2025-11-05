import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail.js';


const PROVIDERS = ['local', 'google'];


const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 80
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: [isEmail, 'Invalid email address']
        },

        // Only stored for local auth; optional for OAuth users
        passwordHash: {
            type: String,
            select: false
        },
        authProvider: {
            type: String,
            enum: PROVIDERS,
            default: 'local'
        },
        googleId: {
            type: String,
            index: true,
            sparse: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        lastLoginAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(doc, ret) {
                delete ret.passwordHash; // never leak
                return ret;
            }
        }
    }
);


// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { sparse: true });


// Password helpers
userSchema.methods.setPassword = async function setPassword(plain) {
    if (!plain || plain.length < 8) {
        throw new Error('Password must be at least 8 characters');
    }
    this.passwordHash = await bcrypt.hash(plain, 12);
};


userSchema.methods.validatePassword = async function validatePassword(plain) {
    if (!this.passwordHash) return false; // OAuth users may not have a hash
    return bcrypt.compare(plain, this.passwordHash);
};


// Minimal public projection
userSchema.methods.toPublic = function toPublic() {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        avatarUrl: this.avatarUrl,
        role: this.role,
        authProvider: this.authProvider,
        createdAt: this.createdAt
    };
};


const User = model('User', userSchema);
export default User;
