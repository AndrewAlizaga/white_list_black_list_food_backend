const mongoose = require("mongoose");
//const userModel = require("./user");

//Base schema
const FoodSchema = new mongoose.Schema({
	restaurant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'restaurant',
		required: true
	},

	title: {
		type: String,
		required: true
	},

	description: {
		type: String,
	},
	
	img: {
		type: String
	},
	
	rating: {
		type: Number
	}
})


const restaurantSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    img: {
	type: String,
	required: true
    },
	
    list: {
	type: mongoose.Type.ObjectId,
	ref: 'list'
    },
	
    menu: [FoodSchema]

}, {timestamps: true});

//Service

//Check ownership
RestaurantSchema.methods.checkOwnership = async function (user) {
    console.log('ownership check')
    console.log(this.user)
    console.log(user)
    return this.user.equals(user)
    //return await bcrypt.compare(enteredPassword, this.password)
}

const restaurantModel = new mongoose.model('restaurant', restaurantSchema);


module.exports = restaurantModel;
