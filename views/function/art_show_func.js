module.exports.chooseCategory = function (cat) {
    var category = "";
    category = cat;
    console.log("this code is running");
    console.log(category);
    switch (category) {
        case "Philosophy":
            var add = document.getElementById('L1');
            add.classList.add('active')
            break;
        case "Computer Science":
            var add = document.getElementById('L2');
            add.classList.add('active')
            break;
        case "Self Improvement":
            var add = document.getElementById('L3');
            add.classList.add('active')
            break;
        case "Science":
            var add = document.getElementById('L4');
            add.classList.add('active')
            break;
        case "Book":
            var add = document.getElementById('L5');
            add.classList.add('active')
            break;
        case "Game":
            var add = document.getElementById('L6');
            add.classList.add('active')
            break;
    }
}