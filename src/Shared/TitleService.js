class TitleService {}

TitleService.SetTitle = (title) => {
    document.getElementsByTagName('header')[0].innerHTML = title;
    document.title = `Mikahouse - ${title}`;
}

export default TitleService;