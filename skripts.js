const SaitActivation = () => {
    const lamps = {
        info: ["lamp", "mainButton", "makeForm", true],
        list: ["Izy", "Tso", "Evo"]
    };
    // activait button
    const plas = document.querySelector(".button-plas");
    plas.addEventListener("click", () => showModalWindow());
    plas.addEventListener("click", () => createForm(lamps));
    const paint = document.querySelector(".paint-button");
    paint.addEventListener("click", () => paintControl());
    // activait memoris
    const curentTask = getLocalStorege("list-storege");
    curentTask.forEach((element) => {
        showBodyUl(element);
    });
};

const paintControl = () => {
    showModalWindow();
    const BufferZone = document.querySelector(".BufferZone");
    const colors = getLocalStorege("color-storege");
    colors.forEach((item) => {
        const section = document.createElement("section");
        section.classList.add("block-of-color");
        section.innerHTML = ` <p>${item}</p>
        <button onclick ="fn('${item}')">Видалити</button>`;
        BufferZone.append(section);
    });
    createForm({
        info: ["Закрити", "button", "closeModalWindow"],
        list: ["Закрити"]
    });
    // BufferZone.append(colors);
};

const fn = (color) => {
    const colors = getLocalStorege("color-storege");
    const fileterArr = colors.filter((item) => item !== color);
    setLocalStorege(fileterArr, "color-storege");
    closeModalWindow();
    paintControl();
};

const showModalWindow = () => {
    const modalBg = document.querySelector(".modal-bg");
    modalBg.style.display = "flex";
    createBufferZone();
};
const createBufferZone = () => {
    const modalWindow = document.querySelector(".modal");
    modalWindow.innerHTML = `<section class="BufferZone"></section> `;
};
const clierModalWindow = () => {
    let BufferZone = document.querySelector(".BufferZone");
    BufferZone.parentNode.removeChild(BufferZone);
};
const closeModalWindow = () => {
    clierModalWindow();
    const modalBg = document.querySelector(".modal-bg");
    modalBg.style.display = "none";
};

// START CREATEFORM

const createForm = ({
    info: [name, type, dopFunc = null, dopFuncArg = null],
    list = []
}) => {
    const BufferZone = document.querySelector(".BufferZone");
    const section = document.createElement("section");
    section.classList.add("block-of-questions");
    list.forEach((item) => {
        const label = document.createElement("label");
        switch (type) {
            case "mainButton":
                label.classList.add("input-button");
                label.innerHTML =
                    createImgSrc(type, item) +
                    createOnclick(item, dopFunc, dopFuncArg);
                break;
            case "radio":
            case "checkbox":
                label.classList.add("input-button");
                label.innerHTML =
                    createInput(type, name, item) +
                    createOnclick(item, dopFunc, dopFuncArg) +
                    `${createImgSrc(type, item)}>`;
                break;
            case "number":
                label.classList.add("input-text");
                label.innerHTML =
                    associationInputPlaceholder(type, name, item, dopFuncArg) +
                    ">";
                break;
            case "datalist":
                label.classList.add("input-text");
                label.innerHTML =
                    associationInputPlaceholder(type, name, item, dopFuncArg) +
                    `list=${name}>`;
                label.append(createDatalist(name));
                break;
            case "button":
                label.classList.add("defolt-input");
                label.innerHTML = createInput(type, name, item) + ">";
                label.addEventListener("click", () =>
                    dopFunc(item, dopFuncArg)
                );
                break;
        }
        section.append(label);
    });
    BufferZone.append(section);
};

const associationInputPlaceholder = (type, name, item, dopFuncArg) =>
    createInput(type, name, item) + createPlaceholder(dopFuncArg);

const createInput = (type, name, value) =>
    `<input type="${type}" name="${name}" value="${value}" `;
const createImgSrc = (type, item) => `<img src="sprites/${type}/${item}.png" `;
const createPlaceholder = (text) => `placeholder="${text}" `;

const createOnclick = (it, dF, dFA) =>
    dF ? `onclick = "${dF}('${it}','${dFA}')"> ` : `> `;

const createDatalist = (name) => {
    const datalist = document.createElement("datalist");
    datalist.id = `${name}`;
    const arr = getLocalStorege(`${name}` + `-storege`);
    arr.forEach((item) => {
        const option = document.createElement("option");
        option.innerText = item;
        datalist.append(option);
    });
    return datalist;
};
const pushColorList = (color) => {
    const colors = getLocalStorege(`color-storege`);
    if (!colors.includes(color)) {
        colors.push(color);
        setLocalStorege(colors, `color-storege`);
    }
};

// END CREATEFORM

const makeForm = (nameForm, bottomButton = false) => {
    clierModalWindow();
    createBufferZone();
    const inputsBlocks = {
        bodyIzy: {
            info: ["body", "radio"],
            list: ["Izy_1", "Izy_2", "Izy_3", "Izy_4", "Izy_5"]
        },
        controlerT: {
            info: ["controlerT", "radio", "radioScript"],
            list: ["zhagaT", "nemaT", "blutuzT"]
        },
        controlerU: {
            info: ["controlerU", "radio", "radioScript"],
            list: ["zhagaU", "nemaU", "blutuzU"]
        },
        ficsation: {
            info: ["ficsation", "radio"],
            list: ["penetration", "D60", "D74", "D60g2", "D74g2"]
        },
        bodyTso: {
            info: ["body", "radio"],
            list: ["Tso_S", "Tso_21"]
        },
        bodyEvo: {
            info: ["body", "radio"],
            list: ["Evo_1", "Evo_3"]
        },
        ficsationTso: {
            info: ["ficsation", "radio"],
            list: ["D46tso", "D60tso", "D74tso"]
        },
        color: {
            info: ["color", "datalist", , "Вкажіть колір"],
            list: [""]
        },
        amount: {
            info: ["amount", "number", , "Вкіжіть кількість"],
            list: [""]
        },
        nambertask: {
            info: ["nambertask", "number", , "Вкажіть номер замовлення"],
            list: ["2400"]
        },
        other: {
            info: ["other", "checkbox"],
            list: ["cabel", "FL"]
        },
        default: {
            info: ["default", "button", checkingInputs],
            list: ["Закрити", "Закр і Зап", "Записати"]
        }
    };
    let form = [];
    switch (nameForm) {
        case "Izy":
            form = [
                "nambertask",
                "color",
                "amount",
                "bodyIzy",
                "controlerT",
                "controlerU",
                "ficsation",
                "other"
            ];
            break;
        case "Tso":
            form = [
                "nambertask",
                "color",
                "amount",
                "bodyTso",
                "controlerT",
                "controlerU",
                "ficsationTso",
                "other"
            ];
            break;
        case "Evo":
            form = [
                "nambertask",
                "color",
                "amount",
                "bodyEvo",
                "controlerT",
                "controlerU",
                "ficsation",
                "other"
            ];
    }
    form.forEach((blockName) => {
        createForm(inputsBlocks[blockName]);
    });
    if (bottomButton) createForm(inputsBlocks.default);
};

const readInputs = () => {
    const activeInputs = document.querySelectorAll("input");
    const task = {};
    for (let value of activeInputs) {
        if (
            value.checked ||
            (value.type != "radio" &&
                value.type != "checkbox" &&
                value.value != "")
        ) {
            if (value.name === "other") {
                if (value.name in task != true) {
                    task[value.name] = [];
                }
                task[value.name].push(value.value);
            } else if (value.name === "color") {
                task[value.name] = value.value.split(" ").join("");
            } else {
                task[value.name] = value.value;
            }
        }
    }
    task.ID = generateId();
    return task;
    // checkingInputs(task, close);
};
const checkingInputs = (nameButton) => {
    if (nameButton == "Закрити") {
        closeModalWindow();
        return;
    }
    task = readInputs();
    let x = false;
    if (!("body" in task)) {
        alert("ВИБЕРІТЬ КОПУС");
        x = true;
    }
    if (!("color" in task)) {
        alert("Вкажіть колір");
        x = true;
    } else {
        pushColorList(task.color);
    }
    if (!("ficsation" in task)) {
        alert("Вкажіть держак");
        x = true;
    }
    if (!("amount" in task)) {
        alert("Вкажіть кількість");
        x = true;
    }
    if (x) {
        return;
    }
    showBodyUl(task);
    // Local Storege
    const curentTask = getLocalStorege("list-storege");
    curentTask.push(task);
    setLocalStorege(curentTask, "list-storege");
    if (nameButton == "Закр і Зап") closeModalWindow();
};
const showBodyUl = (task) => {
    const ul = document.querySelector(".show-task");
    let bodyUl;
    if (document.querySelector("." + task.body)) {
        bodyUl = document.querySelector("." + task.body);
    } else {
        bodyUl = document.createElement("ul");
        bodyUl.classList.add(task.body);
        const bodyName = document.createElement("p");
        bodyName.innerText = task.body;
        bodyName.classList.add("bodyName");
        bodyUl.append(bodyName);
        ul.appendChild(bodyUl);
    }
    showColoorUl(task, bodyUl);
};

const showColoorUl = (task, bodyUl) => {
    let colorUl;
    if (document.querySelector("." + task.body + task.color)) {
        colorUl = document.querySelector("." + task.body + task.color);
    } else {
        colorUl = document.createElement("ul");
        colorUl.classList.add(task.body + task.color, task.body + "color");
        const colorName = document.createElement("p");
        colorName.innerText = task.color;
        colorName.classList.add("colorName");
        colorUl.append(colorName);
        bodyUl.appendChild(colorUl);
    }
    showTask(task, colorUl);
};
const findeCon = (task) => {
    if (!("controlerU" in task) && !("controlerT" in task)) {
        return "Немає Контролера";
    } else if ("controlerU" in task && "controlerT" in task) {
        if (task.controlerT.slice(0, -1) === task.controlerU.slice(0, -1)) {
            return task.controlerT.slice(0, -1) + "TU";
        } else {
            return task.controlerT + " | " + task.controlerU;
        }
    } else {
        return task.controlerT || task.controlerU;
    }
};

const showLiElement = (li, task) => {
    li.id = task.ID;
    li.innerHTML = `
    <section>
    <p>${task.nambertask}</p> <p>${task.amount}</p>
    </section><section>
    <p>${findeCon(task)}</p> <p>${task.ficsation}</p>
    </section>`;
    if ("other" in task) {
        const others = document.createElement("section");
        others.innerHTML = `<p>${task.other.join(" | ")}</p>`;
        li.append(others);
    }
};
const getLiEvent = (li, task) => {
    li.addEventListener("touchstart", (e) => (x = e.changedTouches[0].clientX));
    li.addEventListener(
        "touchend",
        (e) => e.changedTouches[0].clientX - x < -50 && svipeLeft(task)
    );
    li.addEventListener(
        "touchend",
        (e) => e.changedTouches[0].clientX - x > 70 && svipeRight(task)
    );
};
const showTask = (task, colorUl) => {
    // Create
    const li = document.createElement("li");
    li.classList.add(task.body + task.color + "section");
    getLiEvent(li, task);
    showLiElement(li, task);
    colorUl.appendChild(li);
};

//Nid restail

const svipeLeft = (task) => {
    showModalWindow();
    createForm({
        info: ["svipeLeft", "button", svipeLeftButtons, task],
        list: ["Закрити", "Видалити", "Редагувати"]
    });
    // deleteTask(ID, body, color);
};
const svipeLeftButtons = (button, task) => {
    switch (button) {
        case "Закрити":
            closeModalWindow();
            break;
        case "Видалити":
            deleteTask(task);
            closeModalWindow();
            break;
        case "Редагувати":
            svipeRight(task, false);
            createForm({
                info: ["svipeLeft", "button", buttonEdit, task.ID],
                list: ["Зберегти", "Закрити"]
            });
            break;
    }
};

const somsof = (a, b) => {};

const checkedEdit = (ev, { body, color }) => {
    const bodyT = ev.parentElement.parentElement.childNodes[0].innerHTML;
    const colorT = ev.parentElement.childNodes[0].innerHTML;
    if (bodyT != body || colorT != color) {
        return {
            body: bodyT,
            color: colorT
        };
    }
    return false;
};
const buttonEdit = (but, ID) => {
    if (but === "Зберегти") {
        const ev = document.getElementById(`${ID}`);
        const currentTask = getLocalStorege("list-storege");
        const task = readInputs();
        const checked = checkedEdit(ev, task);
        if (checked) {
            checked.ID = ID;
            showBodyUl(task);
            currentTask.push(task);
            setLocalStorege(currentTask, "list-storege");
            deleteTask(checked);
        } else {
            getLiEvent(ev, task);
            showLiElement(ev, task);
            currentTask[currentTask.findIndex((item) => item.ID === ID)] = task;
            setLocalStorege(currentTask, "list-storege");
        }
    }
    closeModalWindow();
};

const deleteTask = ({ ID, body, color }) => {
    const ev = document.getElementById(`${ID}`);
    ev.remove();
    const currentTask = getLocalStorege("list-storege");
    const fileterArr = currentTask.filter((item) => item.ID !== ID);
    setLocalStorege(fileterArr, "list-storege");
    let colorSection = document.querySelector("." + body + color);
    if (colorSection.children.length <= 1) {
        colorSection.remove();
        let bodySection = document.querySelector("." + body);
        if (bodySection.children.length <= 1) {
            bodySection.remove();
        }
    }
};

const svipeRight = (task, bottomButton) => {
    const type = task.body.split("_", 1)[0];
    showModalWindow();
    makeForm(type, bottomButton);
    const activeInputs = document.querySelectorAll("input");
    let x = 0;
    for (let input of activeInputs) {
        switch (input.type) {
            case "number":
            case "text":
                if (input.name in task) {
                    input.value = task[input.name];
                    if (input.name == "amount") {
                        input.value = task.amount[x];
                        x++;
                    }
                }
                break;
            case "mainButton":
            case "radio":
            case "checkbox":
                if (
                    input.value === task[input.name] ||
                    task.other?.includes(input.value)
                ) {
                    input.checked = true;
                }
                break;
            default:
        }
    }
};

const radioScript = (value) => {
    const rad = document.querySelector("input[value ='" + value + "']");
    let siblings = document.querySelectorAll(
        "input[type='radio'][name='" + rad.name + "']"
    );
    for (let i = 0; i < siblings.length; i++) {
        if (siblings[i] != rad) siblings[i].oldChecked = false;
    }
    if (rad.oldChecked) rad.checked = false;
    rad.oldChecked = rad.checked;
};

//Local Storege
const getLocalStorege = (nameStorege) => {
    return JSON.parse(localStorage.getItem(`${nameStorege}`)) || [];
};
const setLocalStorege = (task, nameStorege) => {
    localStorage.setItem(`${nameStorege}`, JSON.stringify(task));
};

function generateId() {
    return "_" + Math.random().toString(36);
}

SaitActivation();
