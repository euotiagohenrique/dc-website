const _elements = 
{
    date: this.document.querySelector('.date'),

    scrollLinks: this.document.querySelectorAll(".navbar-list__links, .footer-list__link"),
    navbarList: this.document.querySelector(".navbar-list"),
    toggle: this.document.querySelector(".navbar-header__toggle"),

    galleryItens: this.document.querySelectorAll(".galeria-item"),
    sliderThumbsImage: this.document.querySelectorAll(".slider-thumbs__img"),
    closeModalBtn:  this.document.querySelector(".modal__close"),
    modal: this.document.querySelector(".modal"),

    slider: this.document.querySelector(".slider-modal"),
    sliderImage: this.document.querySelector(".slider-image__img"),
    sliderImageNumber: this.document.querySelector(".slider-image__number"),
    sliderImageDescription: document.querySelector(".slider-image-description"),
    sliderPrevButton: this.document.querySelector(".slider-buttons__btn-prev"),
    sliderNextButton: this.document.querySelector(".slider-buttons__btn-next")
};
let _sliderCounter = 0, _touchStart, _touchEnd;
// 1º - Incluindo no elemento HTML o ano atual.
_elements.date.innerHTML = new Date().getFullYear();
// 2º - Acessar cada um dos itens individualmente, retornando dentro da variável link, buscar pela informação dentro do atributo href. Logo após selecionar a sessão que corresponde a essa informação, ou seja, o id de cada sessão. Depois é preciso saber onde que se localiza cada sessão. Vamos utilizar um método chamado de window.scrollTo();, com esse método é possível falar para onde a janela do navegador deve se mover. Depois é necessário cancelar o comportamento padrão da janela utilizando o método e.preventDefault;
_elements.scrollLinks.forEach((link) => {
    link.addEventListener('click', e => {
        _elements.navbarList.classList.remove("navbar-list--show-links"); // Ao clicar na opção do menu para despositivos mobile, o menu oculta.

        const id = link.getAttribute("href"); // Pega o atributo do elemento.
        const element = document.querySelector(id);
        const position = element.offsetTop; // Localiza a posição de cada sessão
        window.scrollTo({
            top: position,
            behavior: "smooth"
        })
        e.preventDefault();
    })
})
// 3º - Ativar e ocultar o menu para despositivos Mobile.
_elements.toggle.addEventListener('click', () => {
    _elements.navbarList.classList.toggle("navbar-list--show-links")
})
// 4º -
const _gallery = [
    {
        img: "./assets/image/personagens/superman-gallery.jpg",
        description: "Superman"
    },
    {
        img: "./assets/image/personagens/batman-gallery.jpg",
        description: "Batman"
    },
    {
        img: "./assets/image/personagens/mulher-maravilha-gallery.jpg",
        description: "Mulher Maravilha"
    },
    {
        img: "./assets/image/personagens/flash-gallery.jpg",
        description: "Flash"
    },
    {
        img: "./assets/image/personagens/aquaman-gallery.jpg",
        description: "Aquaman"
    },
    {
        img: "./assets/image/personagens/lanterna-verde-gallery.jpg",
        description: "Lanterna Verde"
    },
    {
        img: "./assets/image/personagens/damian-wayne-gallery.jpg",
        description: "Damian Wayne"
    },
    {
        img: "./assets/image/personagens/doctor-fate-gallery.jpg",
        description: "Dotor Fate"
    },
]
_elements.galleryItens.forEach(item => {
    item.addEventListener('click', e => {
        const id = getImageId(e.target);
        updateModal(id);
        _elements.modal.style.display = "flex"; // Exibe o modal.
    })
})
_elements.closeModalBtn.addEventListener('click', e => {
    _elements.modal.style.display = "none";
})
// - Variável que vai receber o elemento que contém a imagem
const getImageId = (target) => {
    // Vai ter acesso a todos os elementos da galeria.
    const arrFromChildrem = Array.from(target.parentNode.children); // Usar o método Array.from() pega uma lista converte para um array.
    // Pegar a posição de cada foto que o usuário clicou.
    const id = arrFromChildrem.indexOf(target);
   
    _sliderCounter = id;
    return id
}
// Função que atualiza o modal.
const updateModal = (imgId) => {
    // Atualizar a imagem que é exibida
    _elements.sliderImage.src = _gallery[imgId].img;
    _elements.sliderImageDescription.innerHTML = _gallery[imgId].description;
    _elements.sliderImageNumber.innerHTML = (imgId + 1) + " / " + _gallery.length;
    _elements.sliderThumbsImage.forEach(img => {
        img.classList.remove('slider-thumbs__img--active')
    }); 
    _elements.sliderThumbsImage[imgId].classList.add("slider-thumbs__img--active");
}
// Função para que quando o usuário estiver com o modal aberto, possa mudar manualmente clicando em cada imagem da galeria.
_elements.sliderThumbsImage.forEach(img => {
    img.addEventListener('click', e => {
        const id = getImageId(e.target);
        updateModal(id);
    })
})
_elements.sliderNextButton.addEventListener('click', () => nextImage());
const nextImage = () =>
{
    if(++_sliderCounter > 7)
    {
        _sliderCounter = 0
    }
    updateModal(_sliderCounter);
}
_elements.sliderPrevButton.addEventListener('click', () => prevImage());
const prevImage = () =>
{
    if(--_sliderCounter < 0)
    {
        _sliderCounter = _gallery.length - 1;
    }
    updateModal(_sliderCounter);
}