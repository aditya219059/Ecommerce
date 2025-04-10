import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    ask: {
        type: String
    },
},
{timestamps: true}
)

export default mongoose.model("contact", contactSchema);