export const ImageTransition = (elementId, image) => {
    const element = document.getElementById(elementId);
    element.classList.remove('blur');
    element.setAttribute('src', image);
}