export default (() => {
    const images = document.querySelectorAll('img')

    images.forEach(img => {
        let replaceImg = new Image();
        replaceImg.src = img.src;
        img.appendChild(replaceImg);
    })
})();