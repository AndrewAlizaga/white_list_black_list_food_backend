//Libs
const { validationResult } = require("express-validator")

//Models
const restaurantModel = require("../DB/models/restaurant")

const postRestaurant = async (req, res) => {

    //Validate Post body
    const errors = validationResult(req)

    //Ivalid request
    if (!errors.isEmpty())
        return res.status(400).json({ 'errorMessage': errors.array() })

    try {

        //Attempting user creationg
        const newRestaurant = new postRestaurant({ ...req.body});

        newRestaurant.save().then(e => {
            return res.status(200).json({ 'result': 'success', 'message': e })
        });
    } catch (error) {
        //Server error catch
        console.log(error);
        return res.status(503).json({ 'errorMessage': error });
    }
}

const getRestaurant = async (req, res) => {

    try {
        console.log('get posts controller')

        //Get posts, and populate updated name of the author
        const restaurants = await restaurantModel.find().populate('title', 'description', 'img', 'rating')
        res.status(200).json(posts);

    } catch (error) {
        return res.status(503).json({ 'errorMessage': error.toArray() })

    }

}

const getOneRestaurant = async (req, res) => {

    try {
        console.log('get single post controller')

        //Get id param
        const restaurantId = req.params.id


        if(!restaurantId)
            return res.status(400).json({'errorMessage': "Wrong request, bad formulated"})
        
        //Get post, and populate updated name of the author
        const restaurant = await restaurantModel.findById(restaurantId)

        //Check for post's existence
        if(!restaurant){
            return res.status(404).json({'errorMessage': 'Post not found'})
        }
        
        res.status(200).json(restaurant);

    } catch (error) {
        return res.status(503).json({ 'errorMessage': error.toArray() })
    }
}

const updateRestaurant = async (req, res) => {

    //Validate Post body
    const errors = validationResult(req)

    //Ivalid request
    if (!errors.isEmpty())
        return res.status(400).json({ 'errorMessage': errors.array() })
    
    try {
        console.log('update single post controller')

        //Get id param
        const restaurantId = req.params.id

        if(!restaurantId)
            return res.status(400).json({'errorMessage': "Wrong request, bad formulated"})
        
        //Get post, and populate updated name of the author
        let restaurant = await postModel.findById(restaurantId)

        //Check posts existence
        if(!restaurant){
            return res.status(404).json({'errorMessage': 'Restaurant not found'})
        }
        //Check if user owns the post


        //Proceed with update
        restaurant.title = req.body.title
        restaurant.description = req.body.description
	restaurant.img = req.body.img
	

        restaurant.save().then(e => {
            //Restaurant saved and returned
            res.status(200).json(restaurant);
        })
        

    } catch (error) {
        //Server error
        console.log(error)
        return res.status(503).json({ 'errorMessage': error})
    }
}

const deleteRestaurant = async (req, res) => {
    try {
        console.log('delete single post controller')

        //Get id param
        const restaurantId = req.params.id

        if(!restaurantId)
            return res.status(400).json({'errorMessage': "Wrong request, bad formulated"})
        
        //Get restaurant
        let restaurant = await restaurantModel.findById(restaurantId)
	
	if(!restaurant)
		return res.status(404).json({"message": "Restaurant not found"})

        restaurant.remove().then(e => {
                return res.status(200).json({'message': 'Restaurant deleted', e})
            }
        )
        

    } catch (error) {
        //Server error
        console.log(error)
        return res.status(503).json({ 'errorMessage': error})
    }
}




//Exporting controllers
module.exports = { postRestaurant, updateRestaurant, getOneRestaurant, getRestaurant, deleteRestaurant }
