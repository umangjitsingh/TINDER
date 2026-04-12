import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         trim: true,
         minlength: 2,
         maxlength: 50,
      },

      lastName: {
         type: String,
         trim: true,
         minlength: 2,
         maxlength: 50,
      },

      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
         lowercase: true,
         trim: true,
         match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
         ],
         index: true,
      },

      password: {
         type: String,
         required: [true, "Password is required"],
         minlength: 6,
         select: false, // prevents password from being returned in queries
      },

      age: {
         type: Number,
         min: 0,
         max: 120,
      },

      gender: {
         type: String,
         enum: ["male", "female", "others"],
      },

},{timestamps:true});


userSchema.virtual("fullName")
   .get(function () {
      return `${this.firstName} ${this.lastName}`;
   })
   .set(function (value) {
      const [first, last] = value.split(" ");
      this.firstName = first;
      this.lastName = last;
   });

export default mongoose.model("User", userSchema);
