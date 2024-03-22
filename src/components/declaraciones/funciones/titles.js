export const Titles = (id) => {
    let title = '';
    id= parseInt(id)
    if (id > 0 && id <= 3) {
        title = 'Declaración de situación patrimonial' + "  -  " + (id === 1 ? 'Inicial' : (id === 2 ? 'Modificación' : 'Conclusion'));
    }
    return title;

}


