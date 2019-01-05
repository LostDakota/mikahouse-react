export const ImageTransition = (elementId, image) => {
    setTimeout(() => {
        const element = document.getElementById(elementId);
        element.classList.remove('blur');
        element.setAttribute('src', image);
    }, 1000);
}