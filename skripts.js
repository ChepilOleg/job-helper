const SaitActivation = () => {
    const lamps = {
        info: ["lamp", "mainButton"],
        list: ["Izy", "Tso", "Evo"]
    };
    // activait button
    const plas = document.querySelector(".button-plas");
    plas.addEventListener("click", () => showModalWindow());
    plas.addEventListener("click", () => createInputBox(lamps));
    const paint = document.querySelector(".paint-button");
    paint.addEventListener("click", () => paintControl());
    // activait memoris
    const curentTask = getLocalStorege("list-storege");
    curentTask.forEach((element) => {
        showBodyUl(element);
    });
    lampElements();
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
    createInputBox({ info: ["Закрити", "button"], list: ["Закрити"] });
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

const createInputBox = ({
    info: [name, type, dopFunc = false, dopFuncArg],
    list = []
}) => {
    if (!name || !type) {
        alert(`|name = ${name}|  |type= ${type}|`);
        return;
    }
    const BufferZone = document.querySelector(".BufferZone");
    const block = document.createElement("section");
    block.classList.add("block-of-questions");
    list.forEach((item) => {
        const label = document.createElement("label");

        if (type === "button") {
            label.classList.add("defolt-input");
            createButton(item, label, dopFunc, dopFuncArg);
        } else if (
            type === "mainButton" ||
            type === "radio" ||
            type === "checkbox"
        ) {
            label.classList.add("input-button");
            createImgButton(item, name, type, dopFunc, label);
        } else {
            const inp = (name, type, item, value) => {
                label.classList.add("input-text");
                const input = document.createElement("input");
                input.type = type;
                input.name = name;
                input.placeholder = item;
                input.value = value || "";
                return input;
            };
            if (type === "s-on") {
                label.append(inp(name, "number", item, 1));
                label.append(inp(name, "number", item));
            } else if (type === "datalist") {
                const input = inp(name, type, item, dopFuncArg);
                input.setAttribute("list", `${name}`);
                label.append(input, createDatalist(name));
            } else {
                label.append(inp(name, type, item, dopFuncArg));
            }
        }
        block.append(label);
    });
    BufferZone.append(block);
};

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

const createButton = (element, block, dopFunc, dopFuncArg) => {
    const button = document.createElement("button");
    button.innerText = element;
    switch (element) {
        case "Записати":
            button.addEventListener("click", () => checkingInputs());
            break;
        case "Закрити і Записати":
            button.addEventListener("click", () => checkingInputs(true));
            break;
        case "Закрити":
            button.addEventListener("click", () => closeModalWindow());
            break;
        default:
            if (dopFunc) dopFunc(button, dopFuncArg);
    }
    block.appendChild(button);
};
const createImgButton = (item, name, type, dopFunc, label) => {
    const icon = document.createElement("img");
    icon.src = `sprites/${type}/${item}.png`;
    switch (type) {
        case "mainButton":
            createInputBoxTypeMainButton(icon, item);
            break;
        case "radio":
            createInputBoxTypeRadio(item, name, label, dopFunc);
            break;
        case "checkbox":
            createInputBoxTypeCheckbox(item, name, label);
            break;
    }
    label.append(icon);
};
const createInputBoxTypeCheckbox = (value, name, label) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = name;
    input.value = value;
    label.append(input);
};
const createInputBoxTypeMainButton = (icon, item) => {
    icon.addEventListener("click", () => clierModalWindow());
    icon.addEventListener("click", () => makeForm(item));
};
const createInputBoxTypeRadio = (value, name, label, dopFuncshin) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = value;
    if (dopFuncshin) input.addEventListener("click", () => dopFuncshin(value));
    label.append(input);
};

const makeForm = (nameForm, bottomButton = false) => {
    createBufferZone();
    const inputsBlocks = {
        bodyIzy: {
            info: ["body", "radio"],
            list: ["Izy_1", "Izy_2", "Izy_3", "Izy_4", "Izy_5"]
        },
        controlerT: {
            info: ["controlerT", "radio", radioScript],
            list: ["zhagaT", "nemaT", "blutuzT"]
        },
        controlerU: {
            info: ["controlerU", "radio", radioScript],
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
            info: ["color", "datalist"],
            list: ["Введіть колір"]
        },
        amount: {
            info: ["amount", "s-on"],
            list: ["Вкіжіть кількість"]
        },
        nambertask: {
            info: ["nambertask", "number", , 2400],
            list: ["Вкажіть номер замовлення"]
        },
        other: {
            info: ["other", "checkbox"],
            list: ["cabel", "FL"]
        },
        default: {
            info: ["default", "button"],
            list: ["Закрити", "Закрити і Записати", "Записати"]
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
        createInputBox(inputsBlocks[blockName]);
    });
    if (!bottomButton) createInputBox(inputsBlocks.default);
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
            if (value.name === "other" || value.name === "amount") {
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
const checkingInputs = (close) => {
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
    if (task.amount?.length < 2 || !("amount" in task)) {
        alert("Вкажіть кількість");
        x = true;
    }
    if (x) {
        return;
    }
    if (close) closeModalWindow();
    showBodyUl(task);
    // Local Storege
    const curentTask = getLocalStorege("list-storege");
    curentTask.push(task);
    setLocalStorege(curentTask, "list-storege");
    lampElements();
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

const findeAmount = (task) => task.amount[1] - task.amount[0] + 1;

const showLiElement = (li, task) => {
    li.id = task.ID;
    li.innerHTML = `
    <section>
    <p>${task.nambertask}</p> <p>${findeAmount(task)}</p>
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
const lampElements = () => {
    const curentTask = getLocalStorege("list-storege");
    const elements = {};
    curentTask.forEach((element) => {
        const color = element.color;
        let x, y;
        switch (element.lampType) {
            case "Evo":
                if ("other" in element) {
                    for (let x of element.other) {
                        if (x === "frame") {
                            elements[element.body + " " + color + " " + x] =
                                (parseFloat(elements[x]) || 0) +
                                parseFloat(element.amount);
                        }
                    }
                }
            case "Izy":
                y = element.body + " " + color + " ";
                if ("controlerT" in element) {
                    x = y + element.controlerT + " body";
                } else {
                    x = y + " withoutControler body";
                }
                elements[x] =
                    (parseFloat(elements[x]) || 0) + parseFloat(element.amount);

                if ("controlerU" in element) {
                    x = y + element.controlerU + " cover";
                } else {
                    x = y + " withoutControler cover";
                }
                elements[x] =
                    (parseFloat(elements[x]) || 0) + parseFloat(element.amount);

                x = element.ficsation + " " + color;
                elements[x] =
                    (parseFloat(elements[x]) || 0) + parseFloat(element.amount);
                break;
            case "Tso":
                y = element.body + " " + color + " ";
                if ("controlerU" in element) {
                    x = y + element.controlerU + " body";
                } else {
                    x = y + " withoutControler body";
                }
                elements[x] =
                    (parseFloat(elements[x]) || 0) + parseFloat(element.amount);

                if ("controlerT" in element) {
                    x = y + element.controlerT + " cover";
                } else {
                    x = y + " withoutControler cover";
                }
                elements[x] =
                    (parseFloat(elements[x]) || 0) + parseFloat(element.amount);

                x = element.ficsation + " " + color;
                elements[x] =
                    (parseFloat(elements[x]) || 0) + parseFloat(element.amount);
                break;
        }
    });
    showLampElements(elements);
};
const showLampElements = (elements) => {
    const div = document.querySelector(".lamp-elements");
    div.innerText = "";
    for (let element in elements) {
        const section = document.createElement("section");
        const name = document.createElement("p");
        const amount = document.createElement("p");
        name.innerText = element;
        amount.innerText = elements[element];
        section.append(name, amount);
        div.appendChild(section);
    }
};

const svipeLeft = (task) => {
    showModalWindow();
    createInputBox({
        info: ["svipeLeft", "button", svipeLeftButtons, task],
        list: ["Закрити", "Видалити", "Редагувати"]
    });
    // deleteTask(ID, body, color);
};
const svipeLeftButtons = (button, task) => {
    const funck = (button, task) => {
        switch (button.innerText) {
            case "Видалити":
                deleteTask(task);
                closeModalWindow();
                break;
            case "Редагувати":
                svipeRight(task, true);
                createInputBox({
                    info: ["svipeLeft", "button", buttonEdit, task.ID],
                    list: ["ЗБЕРЕГТИ", "Закрити"]
                });
                break;
        }
    };
    button.addEventListener("click", () => funck(button, task));
};

const checkedEdit = (ev, { body, color }) => {
    const bodyT = ev.parentElement.parentElement.childNodes[0].innerHTML;
    const colorT = ev.parentElement.childNodes[0].innerHTML;
    console.log(bodyT);
    console.log(body);
    if (bodyT != body || colorT != color) {
        return {
            body: bodyT,
            color: colorT
        };
    }
    return false;
};
const buttonEdit = (but, ID) => {
    const ev = document.getElementById(`${ID}`);
    but.addEventListener("click", () => click(ev));
    const click = (ev) => {
        const currentTask = getLocalStorege("list-storege");
        const task = readInputs();
        const checked = checkedEdit(ev, task);
        if (checked) {
            checked.ID = ID;
            showBodyUl(task);
            currentTask.push(task);
            console.log(currentTask);
            setLocalStorege(currentTask, "list-storege");
            deleteTask(checked);
        } else {
            getLiEvent(ev, task);
            showLiElement(ev, task);
            currentTask[currentTask.findIndex((item) => item.ID === ID)] = task;
            console.log(currentTask);
            setLocalStorege(currentTask, "list-storege");
        }
        closeModalWindow();
    };
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
