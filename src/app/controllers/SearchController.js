class SearchController {
    search(req, res) {
        res.render('search');
    }
}

//có tác dụng xuất (export) một thể hiện mới của lớp NewsController từ module.
module.exports = new SearchController();
