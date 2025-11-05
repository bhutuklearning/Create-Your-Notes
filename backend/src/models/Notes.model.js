import mongoose, { Schema, model } from 'mongoose';
import slugify from 'slugify';


const MAX_TITLE_LEN = 160;
const MAX_SUMMARY_LEN = 280; // optional short preview
const MAX_CONTENT_BYTES = 100 * 1024; // ~100KB of JSON per note (tune as needed)


const VISIBILITY = ['public', 'private'];

const noteSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: MAX_TITLE_LEN
        },
        // Optional plain-text summary for listing/search; maintain from JSON content
        summary: {
            type: String,
            trim: true,
            maxlength: MAX_SUMMARY_LEN
        },

        // Lexical editor JSON payload
        contentJSON: {
            type: Schema.Types.Mixed, // store raw JSON
            required: true,
            validate: {
                validator(val) {
                    try {
                        const jsonStr = typeof val === 'string' ? val : JSON.stringify(val);
                        return Buffer.byteLength(jsonStr, 'utf8') <= MAX_CONTENT_BYTES;
                    } catch (e) {
                        return false;
                    }
                },
                message: `Note content exceeds ${MAX_CONTENT_BYTES} bytes or is not valid JSON.`
            }
        },


        visibility: {
            type: String,
            enum: VISIBILITY,
            default: 'private',
            index: true
        },


        // Stable public URL slug (unique among author + slug)
        slug: { type: String, index: true },


        // Likes and comments metadata
        likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        commentsCount: { type: Number, default: 0 },


        // Publication timestamps
        publishedAt: { type: Date },
        deletedAt: { type: Date },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(doc, ret) {
                // Optional: don’t leak likedBy list in public responses; keep count instead
                ret.likesCount = Array.isArray(ret.likedBy) ? ret.likedBy.length : 0;
                delete ret.likedBy;
                return ret;
            }
        }
    }
);

// Generate/maintain slug (unique per author)
noteSchema.pre('validate', function nextSlug(next) {
    if (this.isModified('title') || !this.slug) {
        const base = slugify(this.title || 'untitled', { lower: true, strict: true }).slice(0, 96);
        const rand = Math.random().toString(36).slice(2, 6);
        this.slug = `${base}-${rand}`; // lightweight collision avoidance
    }
    next();
});


// Maintain publishedAt based on visibility
noteSchema.pre('save', function setPublished(next) {
    if (this.isModified('visibility')) {
        if (this.visibility === 'public' && !this.publishedAt) {
            this.publishedAt = new Date();
        }
        if (this.visibility === 'private') {
            this.publishedAt = undefined;
        }
    }
    next();
});


// Query helpers
noteSchema.query.publicOnly = function () {
    return this.where({ visibility: 'public', deletedAt: { $exists: false } });
};

noteSchema.query.notDeleted = function () {
    return this.where({ deletedAt: { $exists: false } });
};


// Virtuals
noteSchema.virtual('likesCount').get(function () {
    return this.likedBy?.length || 0;
});


// Indexes
noteSchema.index({ author: 1, slug: 1 }, { unique: true, sparse: true });
noteSchema.index({ visibility: 1, publishedAt: -1 });
noteSchema.index({ title: 'text', summary: 'text' });


// Instance helpers for likes (use atomic ops in services/controllers)
noteSchema.methods.likeBy = function (userId) {
    return this.updateOne({ $addToSet: { likedBy: userId } }).exec();
};


noteSchema.methods.unlikeBy = function (userId) {
    return this.updateOne({ $pull: { likedBy: userId } }).exec();
};


const Note = model('Note', noteSchema);
export default Note;

