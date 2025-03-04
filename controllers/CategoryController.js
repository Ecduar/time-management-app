class CategoryController {
    static categories = [];

    static listCategories(req, res) {
        res.render('categories', { categories: CategoryController.categories });
    }

    static addCategory(req, res) {
        const category = req.body;
        CategoryController.categories.push(category);
        res.status(201).send('Category added');
    }

    static getCategory(req, res) {
        const categoryId = req.params.id;
        const category = CategoryController.categories.find(c => c.id === categoryId);
        if (category) {
            res.render('categoryDetail', { category });
        } else {
            res.status(404).send('Category not found');
        }
    }

    static updateCategory(req, res) {
        const categoryId = req.params.id;
        const categoryIndex = CategoryController.categories.findIndex(c => c.id === categoryId);
        if (categoryIndex !== -1) {
            CategoryController.categories[categoryIndex] = { ...CategoryController.categories[categoryIndex], ...req.body };
            res.send('Category updated');
        } else {
            res.status(404).send('Category not found');
        }
    }

    static deleteCategory(req, res) {
        const categoryId = req.params.id;
        CategoryController.categories = CategoryController.categories.filter(c => c.id !== categoryId);
        res.send('Category deleted');
    }
}

module.exports = CategoryController;