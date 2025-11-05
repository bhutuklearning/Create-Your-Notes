import mongoose, { Schema, model } from 'mongoose';


const commentSchema = new Schema(
    {
        note:
        {
            type: Schema.Types.ObjectId,
            ref: 'Note',
            required: true,
            index: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        body: {
            type: String,
            trim: true,
            required: true,
            maxlength: 4000
        },
        editedAt: {
            type: Date
        },
        deletedAt: {
            type: Date
        },
    },
    { timestamps: true, versionKey: false }
);


commentSchema.index({ note: 1, createdAt: -1 });


const Comment = model('Comment', commentSchema);
export default Comment;