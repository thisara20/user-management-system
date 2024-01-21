import mongoose, {CallbackError , Document, Schema, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User interface
interface IUser extends Document {
  name?: string;
  email?: string;
  password?: string;
  

  passwordComparison(inputPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  //create new object

  name: {
    type: String,
  //  required: true,
  allowNull:true,
  },

  email: {
    type: String,
   // required: true,
   allowNull:true,
  },

  password: {
    type: String,
   // required: true,
   allowNull:false,
  },

  

});

userSchema.pre("save",async function (next) {
  const user = this as IUser;
   
  
  try{
    if (user.password) {
    const hash  =  await bcrypt.hash(user.password, 10)
    user.password  = hash;
    }

   next();
  }catch(error){ 
    next(error as CallbackError );
    console.log(`Error in encrypting password: ${(error as Error).message}`);
 
  }
   
});

// Define the passwordComparison method on the schema
userSchema.methods.passwordComparison = function (inputPassword: string): Promise<boolean> {
  const user = this as IUser;
  // Ensure user.password is not undefined
  if (user.password === undefined) {
    throw new Error("User password is undefined");
  }

   
  return bcrypt.compare(inputPassword, user.password );
};

// Define the User model
const User: Model<IUser> =  model<IUser>('User', userSchema);
//mongoose.model('User', userSchema);

export default User;

// const User = mongoose.model("user", userSchema);
// module.exports = User;
