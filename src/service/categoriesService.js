const Category = require('../models/categories')

const findCategory = async (id) => {
    try {
        const category = Category.find({ id: id })

        if (!category) {
            return 0;
        }
        return 1

    } catch (error) {
        console.error('Error finding category:', error);
    }
}