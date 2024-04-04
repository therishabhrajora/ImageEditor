const fileInput = document.querySelector('.file-input');
const chooseImgBtn = document.querySelector('.choose-img');
const filterName = document.querySelector('.filter-info .name');
const filterSlider = document.querySelector('.slider input');
const sliderValue = document.querySelector(".slider .value");
const previewImg = document.querySelector('.preview-img img');
const filterOptions = document.querySelectorAll('.filter button');
const resetbtn = document.querySelector('.reset-filter');
const rotateOptions = document.querySelectorAll('.rotate button');
const saveImgBtn = document.querySelector('.save-img');

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, fliphorizontal = 1, flipvertical = 1;

const applyfilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${fliphorizontal},${flipvertical})`;
    previewImg.style.filter = `brightness(${brightness}%)saturate(${saturation}%)grayscale(${grayscale}%)invert(${inversion}%)`;

}


const loadimage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetbtn.click();
        document.querySelector(".container").classList.remove("disable");

    })
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        const activeElement = document.querySelector(".filter .active");
        if (activeElement) {
            activeElement.classList.remove("active");
        }
        option.classList.add("active");
        filterName.innerText = option.innerText;
        if (option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = `${brightness}`;
            sliderValue.innerText = `${brightness}`;
        } else if (option.id === "inversion") {
            filterSlider.max = "200";
            filterSlider.value = `${inversion}`;
            sliderValue.innerText = `${inversion}`;
        } else if (option.id === "grayscale") {
            filterSlider.max = "100";
            filterSlider.value = `${grayscale}`;
            sliderValue.innerText = `${grayscale}`;
        } else if (option.id === "saturation") {
            filterSlider.max = "100";
            filterSlider.value = `${saturation}`;
            sliderValue.innerText = `${saturation}`;
        }
    })
});
const updateFilter = () => {

    sliderValue.innerText = filterSlider.value;
    const selectedFilter = document.querySelector(".filter .active");
    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "grayscale") {
        grayscale = filterSlider.value;
    }
    applyfilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90;
        }
        else if (option.id === "right") {
            rotate += 90;
        }
        else if (option.id === "horizontal") {
            fliphorizontal = fliphorizontal === 1 ? -1 : 1;
        } else {
            flipvertical = flipvertical === 1 ? -1 : 1;
        }
        applyfilter();
    })
})

const resetfilter = () => {
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; fliphorizontal = 1; flipvertical = 1;
    filterOptions[0].click();
    applyfilter();
}

const saveimage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.filter = `brightness(${brightness}%)saturate(${saturation}%)grayscale(${grayscale}%)invert(${inversion}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * math.PI / 100);
    }
    ctx.scale(fliphorizontal, flipvertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    // document.body.appendChild(canvas);
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change", loadimage);
filterSlider.addEventListener("input", updateFilter);
resetbtn.addEventListener("click", resetfilter);
saveImgBtn.addEventListener("click", saveimage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
