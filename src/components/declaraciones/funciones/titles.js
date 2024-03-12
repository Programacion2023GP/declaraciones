export const Titles = (page, id) => {
    let title = '';
    if (id > 0 && id <= 3) {
        title = titlesPatrimonial[page - 1] + "  -  " + (id === 1 ? 'Inicial' : (id === 2 ? 'Modificación' : 'Conclusion'));
    }
console.log(page,id,title)
    return title;

}


